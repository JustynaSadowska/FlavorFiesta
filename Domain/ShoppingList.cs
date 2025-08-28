using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class ShoppingList
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public required string UserId { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsDeleted { get; set; }
        public required string Title { get; set; }

        public User User { get; set; } = null!;
        public ICollection<ShoppingListItem> ShoppingListItems { get; set; } = [];
    }
}