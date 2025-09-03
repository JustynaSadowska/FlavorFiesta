using System;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Recipes.Commands;

public class DeleteRecipe
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var recipe = await context.Recipes
                .Include(r => r.Reviews)
                .FirstOrDefaultAsync(r => r.Id == request.Id, cancellationToken);

            if (recipe == null || recipe.IsDeleted == true) return Result<Unit>.Failure("Recipe not found", 404);

            recipe.IsDeleted = true;
            if (recipe.Reviews != null)
            {
                foreach (var review in recipe.Reviews)
                {
                    review.IsDeleted = true;
                }
            }

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<Unit>.Failure("Failed to delete the recipe", 400);

            return Result<Unit>.Success(Unit.Value);
        }

    }
}
