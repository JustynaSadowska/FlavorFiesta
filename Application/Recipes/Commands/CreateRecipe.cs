using System;
using Domain;
using MediatR;
using Persistence;

namespace Application.Recipes.Commands;

public class CreateRecipe
{
    public class Command : IRequest<string>
    {
        public required Recipe Recipe { get; set; }  
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, string>
    {
        public async Task<string> Handle(Command request, CancellationToken cancellationToken)
        {
            context.Recipes.Add(request.Recipe);

            await context.SaveChangesAsync(cancellationToken);

            return request.Recipe.Id;
        }
    }

}
