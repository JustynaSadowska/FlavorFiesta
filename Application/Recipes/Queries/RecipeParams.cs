using System;
using Application.Core;

namespace Application.Recipes.Queries;

public class RecipeParams : PaginationParams<DateTime?>
{
    public string? Filter { get; set; }
    public DateTime StartDate { get; set; }
    // public bool IncludeUserAllergens { get; set; }
    // public List<string>? SelectedTags { get; set; } = [];
    // public List<string>? SelectedIngredients { get; set; } = [];
}
