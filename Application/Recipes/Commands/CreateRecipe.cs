using System;
using Application.Core;
using Application.Interfaces;
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

    public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Command, Result<string>>
    {
        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetUserAsync();

            var recipe = mapper.Map<Recipe>(request.RecipeDto);

            recipe.UserId = user.Id;
            recipe.User = user;
            recipe.CreatedAt = DateTime.UtcNow;

            context.Recipes.Add(recipe);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<string>.Failure("Failed to create the recipe", 400);

            return Result<string>.Success(recipe.Id);
        }
    }

}
