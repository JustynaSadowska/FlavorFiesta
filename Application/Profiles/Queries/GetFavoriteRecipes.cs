using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Application.Recipes.DTOs;
using Application.Recipes.Queries;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Queries
{
    public class GetFavoriteRecipes
    {
        public class Query : IRequest<Result<PagedList<RecipeDto, DateTime?>>>
        {
            public required PaginationParams<DateTime?> Params { get; set; }
        }

        public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Query, Result<PagedList<RecipeDto, DateTime?>>>
        {
            public async Task<Result<PagedList<RecipeDto, DateTime?>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var currentUser = await userAccessor.GetUserAsync();

                var query = context.UserFavoriteRecipes
                    .Where(f => f.UserId == currentUser.Id)
                    .Select(f => f.Recipe)
                    .OrderBy(x => x.CreatedAt)
                    .Where(r => !r.IsDeleted && r.IsVisible && (request.Params.Cursor == null || r.CreatedAt >= request.Params.Cursor))
                    .AsQueryable();

                var projectedRecipes = query.ProjectTo<RecipeDto>(mapper.ConfigurationProvider);

                var recipes = await projectedRecipes
                    .Take(request.Params.PageSize + 1)
                    .ToListAsync(cancellationToken);

                DateTime? nextCursor = null;
                if (recipes.Count > request.Params.PageSize)
                {
                    nextCursor = recipes.Last().CreatedAt;
                    recipes.RemoveAt(recipes.Count - 1);
                }

                return Result<PagedList<RecipeDto, DateTime?>>.Success(
                    new PagedList<RecipeDto, DateTime?>
                    {
                        Items = recipes,
                        NextCursor = nextCursor
                    }
                );
            }
        }
    }
}