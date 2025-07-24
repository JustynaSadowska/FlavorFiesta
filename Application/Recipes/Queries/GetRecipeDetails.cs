using System;
using Application.Core;
using Application.Recipes.DTOs;
using Application.Services;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Recipes.Queries;

public class GetRecipeDetails
{
    public class Query : IRequest<Result<RecipeDto>>
    {
        public required string Id { get; set; }
    }

    public class Handler (AppDbContext context, IMapper mapper, RatingService ratingService) :IRequestHandler<Query, Result<RecipeDto>>
    {
        public async Task<Result<RecipeDto>> Handle (Query request, CancellationToken cancellationToken)
        {
            var recipe = await context.Recipes
                .ProjectTo<RecipeDto>(mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => request.Id == x.Id, cancellationToken);

            if (recipe == null) return Result<RecipeDto>.Failure("Recipe not found", 404);

            var ratings = await ratingService.GetRatings(request.Id);

            if (ratings.Value != null)
            {
                recipe.AverageRating = ratings.Value.AverageRating;
                recipe.ReviewCount = ratings.Value.ReviewCount;
            }
            else
            {
                recipe.AverageRating = 0;
                recipe.ReviewCount = 0;
            }

            return Result<RecipeDto>.Success(recipe);
        }
    }
}
