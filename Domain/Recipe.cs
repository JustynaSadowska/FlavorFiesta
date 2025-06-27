using System;
using System.Reflection.Metadata;
using Domain.Enums;

namespace Domain;

public class Recipe
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string UserId { get; set; }
    public required string Title { get; set; }
    public string? Description { get; set; }
    public int Servings { get; set; }
    public int PreparationTime { get; set; }
    public RecipeDifficulty Difficulty { get; set; }
    public bool IsVisible { get; set; }
    public DateTime CreatedAt { get; set; }
    public bool IsDeleted { get; set; }

    public ICollection<Step> Steps { get; set; } = [];
    public ICollection<Ingredient> Ingredients { get; set; } = [];
    public ICollection<Review>? Reviews { get; set; } = [];
    public User User { get; set; } = null!;
    public ICollection<Tag>? Tags { get; set; } = [];
    public ICollection<Allergen>? Allergens { get; set; } = [];
    //public ICollection<Photo> Photos { get; set; } = [];
   // public ICollection<UserFavoriteRecipe>? FavoritedByUsers { get; set; } = [];
}
