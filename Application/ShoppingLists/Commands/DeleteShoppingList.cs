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
    public class DeleteShoppingList
    {
        public class Command : IRequest<Result<Unit>>
        {
            public required string Id { get; set; }
        }

    public class Handler(AppDbContext context, IUserAccessor userAccessor) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetUserAsync();
            if (user == null)
                return Result<Unit>.Failure("Unauthorized", 401);

            var shoppingList = await context.ShoppingLists
                .FirstOrDefaultAsync(sl => sl.Id == request.Id && sl.UserId == user.Id && !sl.IsDeleted, cancellationToken);;

            if (shoppingList == null) return Result<Unit>.Failure("Shopping list not found", 404);

            shoppingList.IsDeleted = true;

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<Unit>.Failure("Failed to delete the shopping list", 400);

            return Result<Unit>.Success(Unit.Value);
        }

    }
    }
}