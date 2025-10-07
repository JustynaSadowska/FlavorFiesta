using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Application.ShoppingLists.DTOs;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ShoppingLists.Commands
{
    public class EditShoppingList
    {
        public class Command : IRequest<Result<Unit>>
        {
            public required EditShoppingListDto ShoppingListDto { get; set; }
        }

        public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await userAccessor.GetUserAsync();
                
                if (user == null)
                    return Result<Unit>.Failure("Unauthorized", 401);

                var shoppingList = await context.ShoppingLists
                    .Include(sl => sl.ShoppingListItems)
                    .FirstOrDefaultAsync(x => x.Id == request.ShoppingListDto.Id &&
                        !x.IsDeleted, cancellationToken);

                if (shoppingList == null)
                    return Result<Unit>.Failure("Shopping list not found", 404);

                if (shoppingList.UserId != user.Id)
                    return Result<Unit>.Failure("Unauthorized", 403);

                shoppingList.ShoppingListItems.Clear();

                mapper.Map(request.ShoppingListDto, shoppingList);

                var result = await context.SaveChangesAsync(cancellationToken) > 0;

                if (!result) return Result<Unit>.Failure("Failed to update the shopping list", 400);

                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}