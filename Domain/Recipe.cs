using System;
using Domain.Enums;

namespace Domain;

public class Recipe
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    //public required string UserId { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }
    public int Servings { get; set; }
    public int PreparationTime { get; set; }
    public RecipeDifficulty Difficulty { get; set; }
    public bool IsVisible { get; set; }
    public DateTime CreatedAt { get; set; }

}
