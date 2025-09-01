using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.ShoppingLists.DTOs
{
    public class EditShoppingListDto
    {
        public string Id { get; set; } = "";
        public required string Title { get; set; } = "";
        public List<EditShoppingListItemDto> ShoppingListItems { get; set; } = [];
    }
}