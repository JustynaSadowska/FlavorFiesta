using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.ShoppingLists.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ShoppingLists.Queries
{
    public class GetShoppingListDetails
    {
        public class Query : IRequest<Result<ShoppingListDto>>
        {
            public required string Id { get; set; }
        }

        public class Handler (AppDbContext context, IMapper mapper): IRequestHandler<Query, Result<ShoppingListDto>>
        {
            public async Task<Result<ShoppingListDto>> Handle (Query request, CancellationToken cancellationToken)
            {
                var shoppingList = await context.ShoppingLists
                    .Where(x => !x.IsDeleted)
                    .ProjectTo<ShoppingListDto>(mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => request.Id == x.Id, cancellationToken);

                if (shoppingList == null) return Result<ShoppingListDto>.Failure("Shopping list not found", 404);

                return Result<ShoppingListDto>.Success(shoppingList);
            }
        }
    }
}