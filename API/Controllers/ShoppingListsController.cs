using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Ingredients.DTOs;
using Application.ShoppingLists.Commands;
using Application.ShoppingLists.DTOs;
using Application.ShoppingLists.Queries;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ShoppingListsController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<ShoppingListDto>>> GetShoppingLists()
        {
            return await Mediator.Send(new GetShoppingLists.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ShoppingListDto>> GetShoppingListDetails(string id)
        {
            return HandleResult(await Mediator.Send(new GetShoppingListDetails.Query { Id = id }));
        }

        [HttpPost]
        public async Task<ActionResult<string>> CreateShoppingList(CreateShoppingListDto shoppingListDto)
        {
            return HandleResult(await Mediator.Send(new CreateShoppingList.Command { ShoppingListDto = shoppingListDto }));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteShoppingList(string id)
        {
            return HandleResult(await Mediator.Send(new DeleteShoppingList.Command { Id = id }));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> EditShoppingList(string id, [FromBody] EditShoppingListDto shoppingList)
        {
            shoppingList.Id = id;
            return HandleResult(await Mediator.Send(new EditShoppingList.Command { ShoppingListDto = shoppingList }));
        }

        [HttpPost("{listId}/items/{itemId}/toggle")]
        public async Task<ActionResult> CheckedToggle(string listId, string itemId)
        {
            return HandleResult(await Mediator.Send(new CheckedToggle.Command { ListId = listId, ItemId = itemId }));
        }

        [HttpPost("{listId}/addIngredients")]
        public async Task<ActionResult> AddIngredients(string listId, [FromBody] List<CreateIngredientDto> ingredients)
        {
            return HandleResult(await Mediator.Send(new AddIngredients.Command { ListId = listId, Ingredients = ingredients}));
        }
        
    }
}