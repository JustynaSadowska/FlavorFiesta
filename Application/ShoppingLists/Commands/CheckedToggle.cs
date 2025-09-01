using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ShoppingLists.Commands
{
    public class CheckedToggle
    {
        public class Command : IRequest<Result<Unit>>

        {
            public required string ListId { get; set; }
            public required string ItemId { get; set; }

        }

        public class Handler(AppDbContext context, IUserAccessor userAccessor) : IRequestHandler<Command, Result<Unit>>
        {

            public async Task<Result<MediatR.Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await userAccessor.GetUserAsync();

                if (user == null)
                    return Result<Unit>.Failure("Unauthorized", 401);

                var shoppingList = await context.ShoppingLists
                    .FirstOrDefaultAsync(x => x.Id == request.ListId, cancellationToken);

                if (shoppingList == null)
                    return Result<Unit>.Failure("Shopping list not found", 404);

                var shoppingListItem = await context.ShoppingListItems
                    .FirstOrDefaultAsync(x => x.Id == request.ItemId, cancellationToken);

                if (shoppingListItem == null)
                    return Result<Unit>.Failure("Shopping list item not found", 404);

                var isAuthor = shoppingList.UserId == user.Id;

                if (!isAuthor)
                return Result<Unit>.Failure("You are not authorized to update this shopping list", 401);
          
                shoppingListItem.IsChecked = !shoppingListItem.IsChecked;

                return await context.SaveChangesAsync(cancellationToken) > 0
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Problem with updating shopping list", 400);
                
            }
        }
    }
}