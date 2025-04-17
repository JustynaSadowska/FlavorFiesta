using System;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Recipes.Commands;

public class EditRecipe
{
    public class Command : IRequest
    {
        public required Recipe Recipe { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var recipe = await context.Recipes
                .FindAsync([request.Recipe.Id], cancellationToken)
                    ?? throw new Exception("Cannot find recipe");

            // recipe.Title = request.Recipe.Title;
            // recipe.Allergens = request.Recipe.Allergens;
            // recipe.Servings = request.Recipe.Servings;
            // recipe.Tags = request.Recipe.Tags;  
            // recipe.Description = request.Recipe.Description;
            // recipe.Ingredients = request.Recipe.Ingredients;
            // recipe.Difficulty = request.Recipe.Difficulty;
            // recipe.Steps = request.Recipe.Steps;
            // recipe.Photos = request.Recipe.Photos;
            // recipe.IsVisible = request.Recipe.IsVisible;
            // recipe.PreparationTime = request.Recipe.PreparationTime

            mapper.Map(request.Recipe, recipe);

            await context.SaveChangesAsync(cancellationToken);

        }
    }
}
