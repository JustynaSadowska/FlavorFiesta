using System;
using Application.Core;
using Application.Interfaces;
using Application.Recipes.DTOs;
using Application.Steps.DTOs;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Recipes.Commands;

public class CreateRecipe
{
    public class Command : IRequest<Result<string>>
    {
        public required CreateRecipeDto RecipeDto { get; set; }  
    }

    public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Command, Result<string>>
    {
        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetUserAsync();

            var recipe = mapper.Map<Recipe>(request.RecipeDto);

            recipe.UserId = user.Id;
            recipe.User = user;
            recipe.CreatedAt = DateTime.UtcNow;

            var steps = mapper.Map<List<Step>>(request.RecipeDto.Steps);
           
            recipe.Steps = steps;

            var ingredients = mapper.Map<List<Ingredient>>(request.RecipeDto.Ingredients);

            recipe.Ingredients = ingredients;

            var tags = await context.Tags
                .Where(x => request.RecipeDto.TagsIds.Contains(x.Id))
                .ToListAsync();

            recipe.Tags = tags;
            
            var allergens = await context.Allergens
                .Where(x => request.RecipeDto.AllergensIds.Contains(x.Id))
                .ToListAsync();

            recipe.Allergens = allergens;

            context.Recipes.Add(recipe);    

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<string>.Failure("Failed to create the recipe", 400);

            return Result<string>.Success(recipe.Id);
        }
    }

}
