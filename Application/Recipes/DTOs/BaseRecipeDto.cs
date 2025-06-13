using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Enums;

namespace Application.Recipes.DTOs
{
    public class BaseRecipeDto
    {
        public string UserId { get; set; } = "";
        public string Title { get; set; } = "";
        public string? Description { get; set; }
        public int Servings { get; set; }
        public int PreparationTime { get; set; }
        public RecipeDifficulty Difficulty { get; set; }
        public bool IsVisible { get; set; }
        public DateTime CreatedAt { get; set; }
        //public List<string> Tags { get; set; } 
// public List<StepDto> Steps { get; set; } = new();
// public List<IngredientDto> Ingredients { get; set; } = new();
    }
}