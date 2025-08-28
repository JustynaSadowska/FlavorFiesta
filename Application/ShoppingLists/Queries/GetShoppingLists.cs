using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Interfaces;
using Application.ShoppingLists.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ShoppingLists.Queries
{
    public class GetShoppingLists
    {
        public class Query : IRequest<List<ShoppingListDto>> { }
        public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Query, List<ShoppingListDto>>
        {
            public async Task<List<ShoppingListDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await userAccessor.GetUserAsync();

                var shoppingLists = await context.ShoppingLists
                    .Where(sl => sl.UserId == user.Id && !sl.IsDeleted)
                    .ProjectTo<ShoppingListDto>(mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                return shoppingLists;
            }
        }
    }
}