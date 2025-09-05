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
    public class GetUserDetails
    {
        public class Query : IRequest<Result<UserProfile>>
        {
            public required string UserId { get; set; }
        }
        public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Query, Result<UserProfile>>
        {
            public async Task<Result<UserProfile>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await context.Users
                .ProjectTo<UserProfile>(mapper.ConfigurationProvider, new {currentUserId = userAccessor.GetUserId()})
                .SingleOrDefaultAsync(x => request.UserId == x.Id, cancellationToken);
                
                if (user == null) return Result<UserProfile>.Failure("User not found", 404);

            return Result<UserProfile>.Success(user);
            }
        }
    }
}