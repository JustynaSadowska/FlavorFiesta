using Application.Core;
using Application.Interfaces;
using Application.Recipes.DTOs;
using Application.Recipes.Queries;
using Application.Services;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Recipes.Queries;

public class GetRecipeList
{
    public class Query : IRequest<Result<PagedList<RecipeDto, DateTime?>>>
    {
        public required RecipeParams Params { get; set; }
    }

    public class Handler(AppDbContext context, RatingService ratingService,IUserAccessor userAccessor, IMapper mapper) :
        IRequestHandler<Query, Result<PagedList<RecipeDto, DateTime?>>>
    {
        public async Task<Result<PagedList<RecipeDto, DateTime?>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var query = context.Recipes
                .Where(x => !x.IsDeleted && x.IsVisible);

            query = request.Params.SortBy?.ToLower() switch
            {
                "newest" => query.Where(x => request.Params.Cursor == null || x.CreatedAt <= request.Params.Cursor)
                                .OrderByDescending(x => x.CreatedAt),
                "oldest" => query.Where(x => request.Params.Cursor == null || x.CreatedAt >= request.Params.Cursor)
                                .OrderBy(x => x.CreatedAt),
                // "rating" => query
                //     .OrderByDescending(x => x.Reviews
                //         .Where(r => !r.IsDeleted)
                //         .Select(r => (double?)r.Rating)
                //         .Average() ?? 0
                //     )
                //     .ThenByDescending(x => x.CreatedAt)
                //     .Where(x => request.Params.Cursor == null || x.CreatedAt <= request.Params.Cursor),
                
                _ => query.Where(x => request.Params.Cursor == null || x.CreatedAt <= request.Params.Cursor)
                        .OrderByDescending(x => x.CreatedAt)
            };

            if (!string.IsNullOrEmpty(request.Params.Title))
            {
                var title = request.Params.Title.ToLower();
                query = query.Where(r => r.Title.ToLower().Contains(title));
            }

            if (request.Params.IncludeUserAllergens)
            {
                var userId = userAccessor.GetUserId();

                var userAllergenIds = await context.Users
                    .Where(u => u.Id == userId)
                    .SelectMany(u => u.Allergens!)
                    .Select(a => a.Id)
                    .ToListAsync(cancellationToken);

                if (request.Params.IncludeUserAllergens && userAllergenIds.Any())
                {
                    query = query.Where(r =>
                        !r.Allergens!.Any(a => userAllergenIds.Contains(a.Id))
                    );
                }
            }

            if (request.Params.SelectedTags != null && request.Params.SelectedTags.Count != 0)
            {
                var selectedTagIds = request.Params.SelectedTags;
                query = query.Where(r =>
                    selectedTagIds.All(tagId => r.Tags.Any(t => t.Id == tagId))
                );
            }
            if (request.Params.SelectedIngredients != null && request.Params.SelectedIngredients.Count != 0)
            {
                var fridgeIngredients = request.Params.SelectedIngredients.Select(i => i.ToLower()).ToList();

                query = query
                    .Where(r => r.Ingredients.Any(i =>
                        fridgeIngredients.Any(fi =>
                            EF.Functions.TrigramsSimilarity(i.Name.ToLower(), fi) > 0.15 
                        )
                    ))
                    .OrderByDescending(r =>
                        r.Ingredients.Count(i =>
                            fridgeIngredients.Any(fi =>
                                EF.Functions.TrigramsSimilarity(i.Name.ToLower(), fi) > 0.15
                            )
                        )
                    );
            }
            if (request.Params.Difficulty.HasValue)
            {
                query = query.Where(r => r.Difficulty == request.Params.Difficulty.Value);
            }
            
            var projectedRecipes = query.ProjectTo<RecipeDto>(mapper.ConfigurationProvider);

            var recipes = await projectedRecipes
                .Take(request.Params.PageSize + 1)
                .ToListAsync(cancellationToken);
            
            foreach (var recipe in recipes)
            {
                var ratingResult = await ratingService.GetRatings(recipe.Id);

                if (ratingResult.Value != null)
                {
                    recipe.AverageRating = ratingResult.Value.AverageRating;
                    recipe.ReviewCount = ratingResult.Value.ReviewCount;
                }
                else
                {
                    recipe.AverageRating = 0;
                    recipe.ReviewCount = 0;
                }
            }
            DateTime? nextCursor = null;
            if (recipes.Count > request.Params.PageSize)
            {
                nextCursor = recipes.Last().CreatedAt;
                recipes.RemoveAt(recipes .Count - 1);
            }

            return Result<PagedList<RecipeDto, DateTime?>>.Success(
                new PagedList<RecipeDto, DateTime?>
                {
                    Items = recipes,
                    NextCursor = nextCursor
                }
            );
        }
    }
}