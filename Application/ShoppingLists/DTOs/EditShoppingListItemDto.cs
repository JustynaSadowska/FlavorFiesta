using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.ShoppingLists.DTOs
{
    public class EditShoppingListItemDto
    {
        public required string Name { get; set; }
        public required decimal Quantity { get; set; }
        public required string UnitId { get; set; }
        public bool IsChecked { get; set; }
        public int Order { get; set; }
    }
}