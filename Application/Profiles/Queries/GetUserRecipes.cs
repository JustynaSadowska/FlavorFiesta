using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Interfaces;
using Application.Recipes.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.Services;
using Application.Core;

namespace Application.Profiles.Queries
{
    public class GetUserRecipes
    {
        public class Query : IRequest<Result<PagedList<RecipeDto, DateTime?>>>
        {
            public required string UserId { get; set; }
            public required PaginationParams<DateTime?> Params { get; set; }
        }

        public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor, RatingService ratingService) : IRequestHandler<Query, Result<PagedList<RecipeDto, DateTime?>>>
        {
            public async Task<Result<PagedList<RecipeDto, DateTime?>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var currentUser = await userAccessor.GetUserAsync();
                var query = context.Recipes
                    .OrderByDescending(x => x.CreatedAt)
                    .Where(x => x.IsDeleted == false && x.UserId == request.UserId && (request.Params.Cursor == null || x.CreatedAt <= request.Params.Cursor))
                .AsQueryable();

                if (request.UserId != currentUser.Id)
                {
                    query = query.Where(x => x.IsVisible);//jesli user jest na swoim profilu to widzi swoje wszystkie przepisy
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
}