using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class ShoppingListItem
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public required string ShoppingListId { get; set; }
        public required string Name { get; set; }
        public required decimal Quantity { get; set; }
        public bool IsChecked { get; set; }
        public required string UnitId { get; set; }

        public ShoppingList ShoppingList { get; set; } = null!;
        public Unit Unit { get; set; } = null!;
    }
}