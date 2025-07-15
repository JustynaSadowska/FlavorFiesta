using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Ingredients.DTOs;
using Application.Steps.DTOs;
using Domain.Enums;

namespace Application.Recipes.DTOs
{
    public class EditRecipeDto
    {
        public string Id { get; set; } = "";
        public string Title { get; set; } = "";
        public string? Description { get; set; }
        public int Servings { get; set; }
        public int PreparationTime { get; set; }
        public RecipeDifficulty Difficulty { get; set; }
        public bool IsVisible { get; set; }
        public List<string> TagsIds { get; set; } = [];
        public List<string> AllergensIds { get; set; } = [];
        public List<CreateStepDto> Steps { get; set; } = [];
        public List<CreateIngredientDto> Ingredients { get; set; } = [];
    }
}