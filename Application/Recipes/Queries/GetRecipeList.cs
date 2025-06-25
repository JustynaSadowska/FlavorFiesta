using System;
using System.Linq;
using Application.Recipes.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Recipes.Queries;

public class GetRecipeList
{
    public class Query : IRequest<List<RecipeDto>> {}

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, List<RecipeDto>>
    {
        public async Task<List<RecipeDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            return await context.Recipes
                .Where(x => x.IsDeleted == false && x.IsVisible == true)
                .ProjectTo<RecipeDto>(mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);
        }
    }
}
