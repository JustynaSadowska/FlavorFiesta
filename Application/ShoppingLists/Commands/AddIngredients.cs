using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Ingredients.DTOs;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ShoppingLists.Commands
{
    public class AddIngredients
    {
        public class Command : IRequest<Result<MediatR.Unit>>

        {
            public required string ListId { get; set; }
            public required List<CreateIngredientDto> Ingredients { get; set; }
        }

        public class Handler(AppDbContext context, IUserAccessor userAccessor) : IRequestHandler<Command, Result<MediatR.Unit>>
        {

            public async Task<Result<MediatR.Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await userAccessor.GetUserAsync();

                if (user == null)
                    return Result<MediatR.Unit>.Failure("Unauthorized", 401);

                var shoppingList = await context.ShoppingLists
                    .Include(x => x.ShoppingListItems)
                    .FirstOrDefaultAsync(x => x.Id == request.ListId, cancellationToken);

                if (shoppingList == null)
                    return Result<MediatR.Unit>.Failure("Shopping list not found", 404);

                if (shoppingList.UserId != user.Id)
                    return Result<MediatR.Unit>.Failure("You are not authorized to update this shopping list", 401);

                foreach (var ingredientDto in request.Ingredients)
                {
                    var existingItem = shoppingList.ShoppingListItems
                        .FirstOrDefault(i => string.Equals(i.Name, ingredientDto.Name, StringComparison.OrdinalIgnoreCase)
                                        && i.UnitId == ingredientDto.UnitId);
                    
                    if (existingItem != null)
                    {
                        existingItem.Quantity += ingredientDto.Quantity;
                    }

                    else
                    {
                        context.ShoppingListItems.Add(new ShoppingListItem
                        {
                            ShoppingListId = shoppingList.Id,
                            Name = ingredientDto.Name,
                            UnitId = ingredientDto.UnitId,
                            Quantity = ingredientDto.Quantity,
                            IsChecked = false
                        });
                    }
                }

                return await context.SaveChangesAsync(cancellationToken) > 0
                ? Result<MediatR.Unit>.Success(MediatR.Unit.Value)
                : Result<MediatR.Unit>.Failure("Problem with updating shopping list", 400);
                
            }
        }
        
    }
}