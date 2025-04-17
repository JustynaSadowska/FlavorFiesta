using System;
using System.Linq;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Recipes.Queries;

public class GetRecipeList
{
    public class Query : IRequest<List<Recipe>> {}

    public class Handler(AppDbContext context) : IRequestHandler<Query, List<Recipe>>
    {
        public async Task<List<Recipe>> Handle(Query request, CancellationToken cancellationToken)
        {
            return await context.Recipes.Where(x => x.IsDeleted == false).ToListAsync(cancellationToken);
        }
    }
}
