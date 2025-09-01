using System;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Recipes.Commands;

public class UpdateVisibility
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string Id { get; set; }
    }

    public class Handler(IUserAccessor userAccessor, AppDbContext context) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var recipe = await context.Recipes
                .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            if (recipe == null) return Result<Unit>.Failure("Recipe not found", 404);

            var user = await userAccessor.GetUserAsync();

            if (user == null)
                return Result<Unit>.Failure("Unauthorized", 401);

            var isAuthor = recipe.UserId == user.Id;

            if (!isAuthor)
                return Result<Unit>.Failure("You are not authorized to update this recipe", 401);
          
            recipe.IsVisible = !recipe.IsVisible;
           
            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            return result
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Problem updating the DB", 400);

        }
    }
}
