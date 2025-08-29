using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Profiles.DTOs;

namespace Application.ShoppingLists.DTOs
{
    public class CreateShoppingListDto
    {
        public required string Title { get; set; } = "";
        public List<CreateShoppingListItemDto> ShoppingListItems { get; set; } = [];
    }
}