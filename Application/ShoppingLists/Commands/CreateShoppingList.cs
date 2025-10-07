using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Application.ShoppingLists.DTOs;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.ShoppingLists.Commands
{
    public class CreateShoppingList
    {
        public class Command : IRequest<Result<string>>
    {
        public required CreateShoppingListDto ShoppingListDto { get; set; }  
    }

    public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Command, Result<string>>
    {
        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetUserAsync();
            if (user == null)
                return Result<string>.Failure("Unauthorized", 401);

            var shoppingList = mapper.Map<ShoppingList>(request.ShoppingListDto);

            shoppingList.UserId = user.Id;
            shoppingList.User = user;
            shoppingList.CreatedAt = DateTime.UtcNow;

            var shoppingListItems = mapper.Map<List<ShoppingListItem>>(request.ShoppingListDto.ShoppingListItems);
           
            shoppingList.ShoppingListItems = shoppingListItems;

            context.ShoppingLists.Add(shoppingList);    

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<string>.Failure("Failed to create the shopping list", 400);

            return Result<string>.Success(shoppingList.Id);
        }
    }
    }
}