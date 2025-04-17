using System;
using Domain;
using MediatR;
using Persistence;

namespace Application.Recipes.Queries;

public class GetRecipeDetails
{
    public class Query : IRequest<Recipe>
    {
        public required string Id { get; set; }
    }

    public class Handler (AppDbContext context) :IRequestHandler<Query, Recipe>
    {
        public async Task<Recipe> Handle (Query request, CancellationToken cancellationToken)
        {
            var recipe = await context.Recipes.FindAsync([request.Id], cancellationToken) 
                ?? throw new Exception ("Recipe not found");
            return recipe;
        }
    }
}
