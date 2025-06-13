using System;
using Application.Core;
using Application.Recipes.DTOs;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Recipes.Commands;

public class CreateRecipe
{
    public class Command : IRequest<Result<string>>
    {
        public required CreateRecipeDto RecipeDto { get; set; }  
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<string>>
    {
        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {            
            var recipe = mapper.Map<Recipe>(request.RecipeDto);

            context.Recipes.Add(recipe);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<string>.Failure("Failed to create the recipe", 400);

            return Result<string>.Success(recipe.Id);
        }
    }

}
