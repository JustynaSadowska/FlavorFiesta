using System;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Recipes.Queries;

public class GetRecipeDetails
{
    public class Query : IRequest<Result<Recipe>>
    {
        public required string Id { get; set; }
    }

    public class Handler (AppDbContext context) :IRequestHandler<Query, Result<Recipe>>
    {
        public async Task<Result<Recipe>> Handle (Query request, CancellationToken cancellationToken)
        {
            var recipe = await context.Recipes.FindAsync([request.Id], cancellationToken);

            if (recipe == null) return Result<Recipe>.Failure("Recipe not found", 404);

            return Result<Recipe>.Success(recipe);
        }
    }
}
