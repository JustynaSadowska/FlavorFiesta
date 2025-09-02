using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Recipes.DTOs;

namespace Application.ShoppingLists.DTOs
{
    public class ShoppingListItemDto
    {
        public required string Id { get; set; }
        public required string Name { get; set; }
        public required decimal Quantity { get; set; }
        public bool IsChecked { get; set; }
        public UnitDto Unit { get; set; } = null!;
        public int Order { get; set; }
    }
}