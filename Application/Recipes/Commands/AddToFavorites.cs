using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Recipes.Commands
{
    public class AddToFavorites
    {
        public class Command : IRequest<Result<MediatR.Unit>>
        {
            public required string Id { get; set; }
        }

        public class Handler(AppDbContext context, IUserAccessor userAccessor) : IRequestHandler<Command, Result<MediatR.Unit>>
        {
            public async Task<Result<MediatR.Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await userAccessor.GetUserAsync();

                var recipe = await context.Recipes.FindAsync([request.Id], cancellationToken);
                if (recipe == null) return Result<MediatR.Unit>.Failure("Recipe not found", 404);

                if (recipe.UserId == user.Id)
                    return Result<MediatR.Unit>.Failure("You cannot add your own recipe to favorites", 400);

                var exists = await context.UserFavoriteRecipes
                    .AnyAsync(f => f.UserId == user.Id && f.RecipeId == recipe.Id, cancellationToken);
                if (exists) return Result<MediatR.Unit>.Failure("Recipe already in favorites", 400);

                var favorite = new UserFavoriteRecipe
                {
                    UserId = user.Id,
                    RecipeId = recipe.Id,
                    User = user,
                    Recipe = recipe
                };

                context.UserFavoriteRecipes.Add(favorite);

                var result = await context.SaveChangesAsync(cancellationToken) > 0;

                if (!result) return Result<MediatR.Unit>.Failure("Failed to add the recipe", 400);

                return Result<MediatR.Unit>.Success(MediatR.Unit.Value);
            }
        }
    }
}