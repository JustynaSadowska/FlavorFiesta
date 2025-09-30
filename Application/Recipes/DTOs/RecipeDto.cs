using System;
using Application.Allergens.DTOs;
using Application.Ingredients.DTOs;
using Application.Profiles.DTOs;
using Application.Reviews.DTOs;
using Application.Steps.DTOs;
using Domain;
using Domain.Enums;

namespace Application.Recipes.DTOs;

public class RecipeDto
{
    public required string Id { get; set; }
    public required string UserId { get; set; }
    public required string AuthorFirstName { get; set; }
    public required string AuthorLastName { get; set; }
    public required string Title { get; set; }
    public string? Description { get; set; }
    public int Servings { get; set; }
    public int PreparationTime { get; set; }
    public RecipeDifficulty Difficulty { get; set; }
    public bool IsVisible { get; set; }
    public DateTime CreatedAt { get; set; }
    public UserProfile User { get; set; } = null!;
    public ICollection<StepDto> Steps { get; set; } = [];
    public ICollection<IngredientDto> Ingredients { get; set; } = [];
    public ICollection<ReviewDto> Reviews { get; set; } = [];
    public double AverageRating { get; set; }
    public int ReviewCount { get; set; }
    public string? UserImageUrl { get; set; }
    public string? ImageUrl { get; set; }

    public required ICollection<TagDto> Tags { get; set; }
    public ICollection<AllergenDto>? Allergens { get; set; } = [];
}
