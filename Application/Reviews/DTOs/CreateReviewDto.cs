using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Profiles.DTOs;
using Application.Recipes.DTOs;

namespace Application.Reviews.DTOs
{
    public class CreateReviewDto
    {
        public required string RecipeId { get; set; }
        public int Rating { get; set; } 
        public string? Comment { get; set; }
    }
}