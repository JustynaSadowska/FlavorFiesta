using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Review
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public required string RecipeId { get; set; }
        public required string UserId { get; set; }
        public int Rating { get; set; } //  ocena (1-5)
        public string? Comment { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsDeleted { get; set; }
        public Recipe Recipe { get; set; } = null!;
        public User User { get; set; } = null!;
    }
}