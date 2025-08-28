using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Application.Recipes.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Queries
{
    public class GetFavoriteRecipes
    {
        public class Query : IRequest<Result<List<RecipeDto>>> { }

        public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Query, Result<List<RecipeDto>>>
        {
            public async Task<Result<List<RecipeDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var currentUser = await userAccessor.GetUserAsync();

                var recipes = await context.UserFavoriteRecipes
                    .Where(f => f.UserId == currentUser.Id)
                    .Select(f => f.Recipe)
                    .Where(r => !r.IsDeleted && r.IsVisible)
                    .ProjectTo<RecipeDto>(mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                return Result<List<RecipeDto>>.Success(recipes);
            }
        }
    }
}