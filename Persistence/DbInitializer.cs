using System;
using Domain;
using Domain.Enums;

namespace Persistence;

public class DbInitializer
{
    public static async Task SeedData(AppDbContext context)
    {
        if (context.Recipes.Any()) return;

        var recipes = new List<Recipe>
        {
            new ()
            {
                Title = "Spaghetti Carbonara",
                Description = "Klasyczne włoskie danie z boczkiem, jajkami i serem pecorino.",
                Servings = 4,
                PreparationTime = 25,
                Difficulty = RecipeDifficulty.Medium,
                IsVisible = false,
                CreatedAt = DateTime.UtcNow
            },
            new ()
            {
                Title = "Kurczak Tikka Masala",
                Description = "Aromatyczne kawałki kurczaka w kremowym sosie pomidorowym z przyprawami.",
                Servings = 4,
                PreparationTime = 40,
                Difficulty = RecipeDifficulty.Hard,
                IsVisible = true,
                CreatedAt = DateTime.Now.AddMonths(-2)
            },
            new ()
            {
                Title = "Sałatka Cezar",
                Description = "Lekka i pyszna sałatka z kurczakiem, parmezanem i sosem Cezar.",
                Servings = 2,
                PreparationTime = 20,
                Difficulty = RecipeDifficulty.Easy,
                IsVisible = false,
                CreatedAt = DateTime.Now.AddMonths(-4)
            },
            new ()
            {
                Title = "Zupa Pomidorowa",
                Description = "Klasyczna zupa z pomidorów z dodatkiem śmietany i bazylii.",
                Servings = 6,
                PreparationTime = 35,
                Difficulty = RecipeDifficulty.Easy,
                IsVisible = true,
                CreatedAt = DateTime.UtcNow
            },
            new ()
            {
                Title = "Tosty z Awokado",
                Description = "Zdrowe i smaczne tosty z awokado, pomidorem i jajkiem w koszulce.",
                Servings = 1,
                PreparationTime = 10,
                Difficulty = RecipeDifficulty.Easy,
                IsVisible = true,
                CreatedAt = DateTime.UtcNow
            },
            new ()
            {
                Title = "Risotto z Grzybami",
                Description = "Kremowe risotto z aromatycznymi grzybami i serem parmezan.",
                Servings = 4,
                PreparationTime = 45,
                Difficulty = RecipeDifficulty.Medium,
                IsVisible = true,
                CreatedAt = DateTime.Now.AddMonths(-6)
            },
            new ()
            {
                Title = "Burger Wołowy",
                Description = "Soczysty burger wołowy z serem, warzywami i domowym sosem.",
                Servings = 2,
                PreparationTime = 30,
                Difficulty = RecipeDifficulty.Medium,
                IsVisible = true,
                CreatedAt = DateTime.UtcNow
            },
            new ()
            {
                Title = "Tarta Cytrynowa",
                Description = "Lekka i orzeźwiająca tarta z nadzieniem cytrynowym.",
                Servings = 8,
                PreparationTime = 50,
                Difficulty = RecipeDifficulty.Hard,
                IsVisible = true,
                CreatedAt = DateTime.Now.AddMonths(3)
            },
            new ()
            {
                Title = "Gulasz Wołowy",
                Description = "Tradycyjny gulasz wołowy duszony w aromatycznych przyprawach.",
                Servings = 5,
                PreparationTime = 120,
                Difficulty = RecipeDifficulty.Hard,
                IsVisible = true,
                CreatedAt = DateTime.UtcNow
            },
            new ()
            {
                Title = "Pancakes Amerykańskie",
                Description = "Puszyste amerykańskie naleśniki podawane z syropem klonowym.",
                Servings = 4,
                PreparationTime = 20,
                Difficulty = RecipeDifficulty.Easy,
                IsVisible = true,
                CreatedAt = DateTime.UtcNow
            }
        };

        context.Recipes.AddRange(recipes);

        await context.SaveChangesAsync();
    }
}
