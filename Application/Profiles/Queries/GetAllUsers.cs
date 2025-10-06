using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Application.Profiles.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Queries
{
   
    public class GetAllUsers
    //wyswtetla liste uzytkownikow bez profilu aktulanie zalogowanego uzytkownika
    {
        public class Query : IRequest<Result<PagedList<UserProfile, DateTime?>>>
        {
        public required UserParams Params { get; set; }
        }
        public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Query, Result<PagedList<UserProfile, DateTime?>>>
        {
            async Task<Result<PagedList<UserProfile, DateTime?>>> IRequestHandler<Query, Result<PagedList<UserProfile, DateTime?>>>.Handle(Query request, CancellationToken cancellationToken)
            {
                var currentUser = await userAccessor.GetUserAsync();

                var adminRoleId = await context.Roles
                    .Where(r => r.Name == "ADMIN")
                    .Select(r => r.Id)
                    .FirstOrDefaultAsync(cancellationToken);

                var adminUserIds = await context.UserRoles
                    .Where(ur => ur.RoleId == adminRoleId)
                    .Select(ur => ur.UserId)
                    .ToListAsync(cancellationToken);

                // var query = context.Users
                //     .Where(x => x.Id != currentUser.Id && !adminUserIds.Contains(x.Id))
                //     .AsQueryable();

                var query = context.Users.AsQueryable();

                if (currentUser != null)
                {
                    query = query.Where(x => x.Id != currentUser.Id);
                }

                query = query.Where(x => !adminUserIds.Contains(x.Id));

                if (request.Params.Cursor != null)
                {
                    query = query.Where(u => u.DateRegistered <= request.Params.Cursor);
                }

                if (!string.IsNullOrEmpty(request.Params.Name))
                {
                    var nameLower = request.Params.Name.ToLower();
                    query = query.Where(u =>
                        u.FirstName!.ToLower().Contains(nameLower) ||
                        u.LastName!.ToLower().Contains(nameLower)
                    );
                }

                query = query.OrderByDescending(u => u.DateRegistered);

                var projectedProfiles = query.ProjectTo<UserProfile>(mapper.ConfigurationProvider);

                var profiles = await projectedProfiles
                    .Take(request.Params.PageSize + 1)
                    .ToListAsync(cancellationToken);

                DateTime? nextCursor = null;
                if (profiles.Count > request.Params.PageSize)
                {
                    nextCursor = profiles.Last().DateRegistered;
                    profiles.RemoveAt(profiles.Count - 1);
                }

                return Result<PagedList<UserProfile, DateTime?>>.Success(
                    new PagedList<UserProfile, DateTime?>
                    {
                        Items = profiles,
                        NextCursor = nextCursor
                    }
                );
            }
        }
    }
}