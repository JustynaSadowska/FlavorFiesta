using System;
using Application.Core;
using MediatR;
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
                .FindAsync([request.Id], cancellationToken);

            if (recipe != null) return Result<Unit>.Failure("Recipe not found", 404);

            recipe.IsDeleted = true;

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<Unit>.Failure("Failed to delete the recipe", 400);

            return Result<Unit>.Success(Unit.Value);
        }

    }
}
