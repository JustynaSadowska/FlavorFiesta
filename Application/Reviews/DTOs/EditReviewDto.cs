using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Reviews.DTOs
{
    public class EditReviewDto
    {
        public string Id { get; set; } = "";
        public required string RecipeId { get; set; }
        public int Rating { get; set; } 
        public string? Comment { get; set; }
    }
}