using System;
using MediatR;
using Persistence;

namespace Application.Recipes.Commands;

public class DeleteRecipe
{
    public class Command : IRequest
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var recipe = await context.Recipes
                .FindAsync([request.Id], cancellationToken)
                    ?? throw new Exception("Cannot find recipe");

            recipe.IsDeleted = true;

            await context.SaveChangesAsync(cancellationToken);
        }

    }
}
