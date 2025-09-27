using System;
using Application.Core;
using Domain.Enums;

namespace Application.Recipes.Queries;

public class RecipeParams : PaginationParams<DateTime?>
{
    public string? Title { get; set; }
    public bool IncludeUserAllergens { get; set; }
    public List<string>? SelectedTags { get; set; } = [];
    public List<string>? SelectedIngredients { get; set; } = [];
    public string? SortBy { get; set; }
    public RecipeDifficulty? Difficulty { get; set; }
}
