using System;
using Application.Profiles.DTOs;
using Domain;
using Domain.Enums;

namespace Application.Recipes.DTOs;

public class RecipeDto
{
    public required string Id { get; set; }
    public required string UserId { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string Title { get; set; }
    public string? Description { get; set; }
    public int Servings { get; set; }
    public int PreparationTime { get; set; }
    public RecipeDifficulty Difficulty { get; set; }
    public bool IsVisible { get; set; }
    public DateTime CreatedAt { get; set; }
    public bool IsDeleted { get; set; }
    public UserProfile User { get; set; } = null!;
    //public ICollection<Step> Steps { get; set; } = [];
    //public ICollection<Ingredient> Ingredients { get; set; } = [];
    //public ICollection<Review>? Reviews { get; set; } = [];

    //public ICollection<Tag> Tags { get; set; } = [];
    //public ICollection<Allergen> Allergens { get; set; } = [];
    //public ICollection<Photo> Photos { get; set; } = [];
    //public ICollection<UserFavoriteRecipe> FavoritedByUsers { get; set; } = [];
}
