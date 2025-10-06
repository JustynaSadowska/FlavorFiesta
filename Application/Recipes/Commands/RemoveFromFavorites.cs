using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Recipes.Commands
{
    public class RemoveFromFavorites
    {
        public class Command : IRequest<Result<Unit>>
        {
            public required string Id { get; set; }
        }

        public class Handler(AppDbContext context,IUserAccessor userAccessor) : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await userAccessor.GetUserAsync();
                if (user == null)
                    return Result<MediatR.Unit>.Failure("Unauthorized", 401);
                
                var recipe = await context.Recipes.FindAsync( request.Id , cancellationToken);
                if (recipe == null) return Result<Unit>.Failure("Recipe not found", 404);

                var favorite = await context.UserFavoriteRecipes
                    .FirstOrDefaultAsync(f => f.UserId == user.Id && f.RecipeId == recipe.Id, cancellationToken);

                if (favorite == null)
                    return Result<Unit>.Failure("Recipe is not in favorites", 400);

                context.UserFavoriteRecipes.Remove(favorite);

                var result = await context.SaveChangesAsync(cancellationToken) > 0;
                if (!result) return Result<Unit>.Failure("Failed to remove the recipe", 500);

                return Result<Unit>.Success(Unit.Value);
            }

        }
    }
}