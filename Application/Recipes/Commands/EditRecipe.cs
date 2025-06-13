using System;
using Application.Core;
using Application.Recipes.DTOs;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Recipes.Commands;

public class EditRecipe
{
    public class Command : IRequest<Result<MediatR.Unit>>
    {
        public required EditRecipeDto RecipeDto { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<MediatR.Unit>>
    {
        public async Task<Result<MediatR.Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var recipe = await context.Recipes
                .FindAsync([request.RecipeDto.Id], cancellationToken);
                   
            if (recipe != null) return Result<MediatR.Unit>.Failure("Recipe not found", 404);


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

            mapper.Map(request.RecipeDto, recipe);

             var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<MediatR.Unit>.Failure("Failed to update the recipe", 400);

            return Result<MediatR.Unit>.Success(MediatR.Unit.Value);

        }
    }
}
