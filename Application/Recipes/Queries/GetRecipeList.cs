using System;
using System.Linq;
using Application.Recipes.DTOs;
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
    public class Query : IRequest<List<RecipeDto>> {}

    public class Handler(AppDbContext context, IMapper mapper, RatingService ratingService) : IRequestHandler<Query, List<RecipeDto>>
    {
        public async Task<List<RecipeDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var recipes = await context.Recipes
                .Where(x => !x.IsDeleted && x.IsVisible)
                .ProjectTo<RecipeDto>(mapper.ConfigurationProvider)
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

        return recipes;
        }
    }
}
