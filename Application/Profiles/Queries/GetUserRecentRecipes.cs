using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Recipes.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Queries
{
    public class GetUserRecentRecipes
    {
        public class Query : IRequest<Result<UserRecentRecipesDto>>
        { 
            public required string UserId { get; set; }
        }

        public class UserRecentRecipesDto
        {
            public int TotalCount { get; set; }
            public List<RecentRecipesDto> RecentRecipes { get; set; } = new();
        }

        public class Handler(AppDbContext context) : IRequestHandler<Query, Result<UserRecentRecipesDto>>
        {
            public async Task<Result<UserRecentRecipesDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = context.Recipes
                    .Where(r => !r.IsDeleted && r.IsVisible && r.UserId == request.UserId)
                    .OrderByDescending(r => r.CreatedAt)
                    .AsQueryable();

                var totalCount = await query.CountAsync(cancellationToken);

                var recentRecipes = await query
                    .Take(3)
                    .Select(r => new RecentRecipesDto
                    {
                        Id = r.Id,
                        ImageUrl = r.ImageUrl
                    })
                    .ToListAsync(cancellationToken);

                var result = new UserRecentRecipesDto
                {
                    TotalCount = totalCount,
                    RecentRecipes = recentRecipes
                };

                return Result<UserRecentRecipesDto>.Success(result);
            }
        }
    }
}
