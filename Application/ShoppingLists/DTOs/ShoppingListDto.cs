using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Profiles.DTOs;

namespace Application.ShoppingLists.DTOs
{
    public class ShoppingListDto
    {
        public required string Id { get; set; }
        public required string UserId { get; set; }
        public DateTime CreatedAt { get; set; }
        public required string Title { get; set; }

        public UserProfile User { get; set; } = null!;
        public ICollection<ShoppingListItemDto> ShoppingListItems { get; set; } = [];

    }
}