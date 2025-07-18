using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        public class Query : IRequest<List<UserProfile>>{}
        public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Query, List<UserProfile>>
        {
            public async Task<List<UserProfile>> Handle(Query request, CancellationToken cancellationToken)
            {
                var currentUser = await userAccessor.GetUserAsync();

                return await context.Users
                    .Where(x => x.Id != currentUser.Id)
                    .ProjectTo<UserProfile>(mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);
            }
        }
    }
}