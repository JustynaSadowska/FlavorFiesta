using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Unit
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public required string DisplayName { get; set; }

        public ICollection<Ingredient> Ingredients{ get; set; } = [];
        public ICollection<ShoppingListItem> ShoppingListItems{ get; set; } = [];
    }
}