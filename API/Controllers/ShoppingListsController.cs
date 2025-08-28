using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
    }
}