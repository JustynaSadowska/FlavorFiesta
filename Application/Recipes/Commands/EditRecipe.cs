using System;
using Application.Core;
using Application.Interfaces;
using Application.Recipes.DTOs;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Recipes.Commands;

public class EditRecipe
{
    public class Command : IRequest<Result<MediatR.Unit>>
    {
        public required EditRecipeDto RecipeDto { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Command, Result<MediatR.Unit>>
    {
        public async Task<Result<MediatR.Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetUserAsync();
            if (user == null)
                return Result<MediatR.Unit>.Failure("Unauthorized", 401);

            var recipe = await context.Recipes
                .Include(r => r.Steps)
                .Include(r => r.Ingredients)
                .Include(r => r.Tags)
                .Include(r => r.Allergens)
                .FirstOrDefaultAsync(x => x.Id == request.RecipeDto.Id, cancellationToken);

            if (recipe == null)
                return Result<MediatR.Unit>.Failure("Recipe not found", 404);

            if (recipe.UserId != user.Id)
                return Result<MediatR.Unit>.Failure("Unauthorized", 403);

            // recipe.Title = request.RecipeDto.Title;
            // recipe.Description = request.RecipeDto.Description;
            // recipe.Servings = request.RecipeDto.Servings;
            // recipe.PreparationTime = request.RecipeDto.PreparationTime;
            // recipe.Difficulty = request.RecipeDto.Difficulty;
            // recipe.IsVisible = request.RecipeDto.IsVisible;

            recipe.Steps.Clear();
            // var newSteps = mapper.Map<List<Step>>(request.RecipeDto.Steps);
            // recipe.Steps = newSteps;//dodac kolejnosc?

            recipe.Ingredients.Clear();
            // var newIngredients = mapper.Map<List<Ingredient>>(request.RecipeDto.Ingredients);
            // recipe.Ingredients = newIngredients;

            mapper.Map(request.RecipeDto, recipe);

            var tags = await context.Tags
                .Where(x => request.RecipeDto.TagsIds.Contains(x.Id))
                .ToListAsync(cancellationToken);
            recipe.Tags = tags;

            var allergens = await context.Allergens
                .Where(x => request.RecipeDto.AllergensIds.Contains(x.Id))
                .ToListAsync(cancellationToken);
            recipe.Allergens = allergens;

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<MediatR.Unit>.Failure("Failed to update the recipe", 400);

            return Result<MediatR.Unit>.Success(MediatR.Unit.Value);

        }
    }
}
