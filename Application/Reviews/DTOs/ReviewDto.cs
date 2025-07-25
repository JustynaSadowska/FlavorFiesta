using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Profiles.DTOs;

namespace Application.Reviews.DTOs
{
    public class ReviewDto
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        //public required string RecipeId { get; set; }
        //public required string UserId { get; set; }
        public int Rating { get; set; }
        public string? Comment { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsDeleted { get; set; }
        public UserProfile ReviewAuthor { get; set; } = null!;
    }
}