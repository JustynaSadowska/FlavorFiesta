using System;
using Domain;
using Domain.Enums;
using Microsoft.AspNetCore.Identity;

namespace Persistence;

public class DbInitializer
{
    public static async Task SeedData(AppDbContext context, UserManager<User> userManager)
    {

        var units = new List<Unit>
        {
            new() { DisplayName = "g" },     // grams
            new() { DisplayName = "kg" },    // kilograms
            new() { DisplayName = "pcs" },   // pieces
            new() { DisplayName = "ml" },    // milliliters
            new() { DisplayName = "l" },     // liters
            new() { DisplayName = "tsp" },   // teaspoon
            new() { DisplayName = "tbsp" },  // tablespoon
            new() { DisplayName = "cup" },   // cup
            new() { DisplayName = "oz" },    // ounces
            new() { DisplayName = "lb" },    // pounds
            new() { DisplayName = "slice" }, // slice
            new() { DisplayName = "pinch" }, // pinch
            new() { DisplayName = "dash" }   // dash
        };

        context.Units.AddRange(units);

        var allergens = new List<Allergen>
        {
            new() { Name = "Gluten" },
            new() { Name = "Peanuts" },
            new() { Name = "Tree Nuts" },
            new() { Name = "Dairy" },
            new() { Name = "Eggs" },
            new() { Name = "Fish" },
            new() { Name = "Soy" },
            new() { Name = "Seafood" },
            new() { Name = "Lactose"},
            new() { Name = "Celery" },
            new() { Name = "Wheat" },
            new() { Name = "Barley" },//Jęczmień
            new() { Name = "Rye" },//zyto
            new() { Name = "Tomatoes" },
            new() { Name = "Mustard" },           
            new() { Name = "Sesame" },            
            new() { Name = "Sulphites" },// Siarczyny (np. w suszonych owocach, winie)
            new() { Name = "Corn" },              
            new() { Name = "Kiwi" },             
            new() { Name = "Banana" },            
            new() { Name = "Chocolate" },         
            new() { Name = "Garlic" },            
            new() { Name = "Onion" },             
            new() { Name = "Mushrooms" }
        };

        context.Allergens.AddRange(allergens);

        var tags = new List<Tag>
        {
            new() { Name = "Vegan" },
            new() { Name = "Vegetarian" },
            new() { Name = "Gluten-Free" },
            new() { Name = "Dairy-Free" },
            new() { Name = "Low-Carb" },
            new() { Name = "High-Protein" },
            new() { Name = "Breakfast" },
            new() { Name = "Lunch" },
            new() { Name = "Dinner" },
            new() { Name = "Dessert" },
            new() { Name = "Snack" },
            new() { Name = "Spicy" },
            new() { Name = "Quick & Easy" },
            new() { Name = "Healthy" },
            new() { Name = "Comfort Food" },
            new() { Name = "Sugar-Free" },
            new() { Name = "Keto" },
            new() { Name = "Diabetic-Friendly" },
        };
        context.Tags.AddRange(tags);

        var users = new List<User>
        {
            new() {
                UserName = "anna@test.com",
                Email = "anna@test.com",
                FirstName = "Anna",
                LastName = "Marek",
                //Allergens = [allergens[1], allergens[2], allergens[10], allergens[12]]
            },
            new() {
                UserName = "antoni@test.com",
                Email = "antoni@test.com",
                FirstName = "Antoni",
                LastName = "Kowalski",
                //Allergens = [allergens[2]]
            },
            new() {
                UserName = "tomek@test.com",
                Email = "tomek@test.com",
                FirstName = "Tomek",
                LastName = "Kowaleski",
                //Allergens = [allergens[2]]
            }
        };

        if (!userManager.Users.Any())
        {
            foreach (var user in users)
            {
                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }
        if (context.Recipes.Any()) return;

        var recipes = new List<Recipe>
        {
            new()
            {
                Title = "Spaghetti Carbonara",
                UserId = users[0].Id,
                Description = "Klasyczne włoskie danie z boczkiem, jajkami i serem pecorino.",
                Servings = 4,
                PreparationTime = 25,
                Difficulty = RecipeDifficulty.Medium,
                IsVisible = false,
                CreatedAt = DateTime.UtcNow,
                // Tags =
                // {
                //     tags[8],
                //     tags[11]
                // },
                // Allergens = new List<Allergen> { allergens[5] }

            },
            new()
            {
                Title = "Kurczak Tikka Masala",
                UserId = users[1].Id,
                Description = "Aromatyczne kawałki kurczaka w kremowym sosie pomidorowym z przyprawami.",
                Servings = 4,
                PreparationTime = 40,
                Difficulty = RecipeDifficulty.Hard,
                IsVisible = true,
                CreatedAt = DateTime.Now.AddMonths(-2),
                // Tags =
                // {
                //     tags[8],
                //     tags[5]
                // },
                // Allergens = new List<Allergen> { allergens[13] }

            },
            new()
            {
                Title = "Tosty z Awokado",
                UserId = users[0].Id,
                Description = "Zdrowe i smaczne tosty z awokado, pomidorem i jajkiem w koszulce.",
                Servings = 1,
                PreparationTime = 10,
                Difficulty = RecipeDifficulty.Easy,
                IsVisible = true,
                CreatedAt = DateTime.UtcNow,
            //     Tags =
            //     { tags[6], tags[10], tags[12], tags[13]
            //     },
            //    Allergens = new List<Allergen> { allergens[0], allergens[4] }
            },
        };
        context.Recipes.AddRange(recipes);

        var reviews = new List<Review>
            {
                // recipe 1
                new()
                {
                    RecipeId = recipes[0].Id,
                    UserId = users[1].Id,
                    Rating = 5,
                    Comment = "Świetny przepis! Bardzo smaczne danie, na pewno zrobię je ponownie.",
                    CreatedAt = DateTime.UtcNow.AddDays(-5),
                    IsDeleted = false
                },
                new()
                {
                    RecipeId = recipes[0].Id,
                    UserId = users[2].Id,
                    Rating = 3,
                    Comment = "Przepis ok, ale wymaga poprawek. Myślę, że dodałbym więcej przypraw.",
                    CreatedAt = DateTime.UtcNow.AddDays(-15),
                    IsDeleted = false
                },
                // recipe 2
                new()
                {
                    RecipeId = recipes[1].Id,
                    UserId = users[0].Id,
                    Rating = 4,
                    Comment = "Super przepis!",
                    CreatedAt = DateTime.UtcNow.AddDays(-5),
                    IsDeleted = false
                },
                new()
                {
                    RecipeId = recipes[1].Id,
                    UserId = users[2].Id,
                    Rating = 2,
                    Comment = "Niesmaczne!!! Nie polecam",
                    CreatedAt = DateTime.UtcNow.AddDays(-15),
                    IsDeleted = false
                },
                // recipe 3
                new()
                {
                    RecipeId = recipes[2].Id,
                    UserId = users[1].Id,
                    Rating = 5,
                    Comment = "Świetny przepis!",
                    CreatedAt = DateTime.UtcNow.AddDays(-5),
                    IsDeleted = false
                },
                new()
                {
                    RecipeId = recipes[2].Id,
                    UserId = users[2].Id,
                    Rating = 4,
                    Comment = "Dobre, ale mogłoby być trochę bardziej pikantne. Smaczne!",
                    CreatedAt = DateTime.UtcNow.AddDays(-10),
                    IsDeleted = false
                }
            };

        context.Reviews.AddRange(reviews);

        var steps = new List<Step>
            {
                // recipe 1
                new()
                {
                    RecipeId = recipes[0].Id,
                    Description = "Ugotuj makaron al dente",
                },
                new()
                {
                    RecipeId = recipes[0].Id,
                    Description = "Podsmaż boczek na patelni"
                },
                // recipe 2
                new()
                {
                    RecipeId = recipes[1].Id,
                    Description = "Pokroj kurczaka"
                },
                new()
                {
                    RecipeId = recipes[1].Id,
                    Description = "Usmaz go"
                },
                new()
                {
                    RecipeId = recipes[1].Id,
                    Description = "Dodaj sos"
                },
                new()
                {
                    RecipeId = recipes[1].Id,
                    Description = "Wymieszaj"
                },
                // recipe 3
                new()
                {
                    RecipeId = recipes[2].Id,
                    Description = "Pokroj awokado"
                },
                new()
                {
                    RecipeId = recipes[2].Id,
                    Description = "Podpiecz chleb"
                },
                new()
                {
                    RecipeId = recipes[2].Id,
                    Description = "Usmax jajko sadzone"
                },

            };

        context.Steps.AddRange(steps);

        var ingredients = new List<Ingredient>
            {
                // recipe 1
                new()
                {
                    RecipeId = recipes[0].Id,
                    Name = "Boczek",
                    Quantity = 300,
                    UnitId = units[0].Id
                },
                new()
                {
                    RecipeId = recipes[0].Id,
                    Name = "Jajka",
                    Quantity = 5,
                    UnitId = units[2].Id
                },
                new()
                {
                    RecipeId = recipes[0].Id,
                    Name = "Ser",
                    Quantity = 100,
                    UnitId = units[0].Id
                },
                // recipe 2
                new()
                {
                    RecipeId = recipes[1].Id,
                    Name = "Kurczak",
                    Quantity = 1,
                    UnitId = units[1].Id
                },
                new()
                {
                    RecipeId = recipes[1].Id,
                    Name = "Sos",
                    Quantity = 500,
                    UnitId = units[3].Id
                },
                new()
                {
                    RecipeId = recipes[1].Id,
                    Name = "Oliwa",
                    Quantity = 1,
                    UnitId = units[7].Id
                },
                // recipe 3
                new()
                {
                    RecipeId = recipes[2].Id,
                    Name = "Awokado",
                    Quantity = 1,
                    UnitId = units[2].Id
                },
                new()
                {
                    RecipeId = recipes[2].Id,
                    Name = "chleb",
                    Quantity = 3,
                    UnitId = units[10].Id
                },
                new()
                {
                    RecipeId = recipes[2].Id,
                    Name = "Jajko",
                    Quantity = 1,
                    UnitId = units[2].Id
                },
            };

        context.Ingredients.AddRange(ingredients);

        var shoppingLists = new List<ShoppingList>
            {
                new()
                {
                    UserId = users[0].Id,
                    CreatedAt = DateTime.UtcNow.AddDays(-10),
                    IsDeleted = false

                },
                new()
                {
                    UserId = users[1].Id,
                    CreatedAt = DateTime.UtcNow.AddDays(-100),
                    IsDeleted = false

                }
            };

        context.ShoppingLists.AddRange(shoppingLists);

        var shoppingListItems = new List<ShoppingListItem>
            {
                // shopping list 1
                new()
                {
                    ShoppingListId = shoppingLists[0].Id,
                    Name = "Pomidor",
                    Quantity = 1,
                    UnitId = units[0].Id,
                },
                new()
                {
                    ShoppingListId = shoppingLists[0].Id,
                    Name = "Kalafior",
                    Quantity = 1,
                    UnitId = units[5].Id,
                },
                // shopping list 2
                new()
                {
                    ShoppingListId = shoppingLists[1].Id,
                    Name = "Kurczak",
                    Quantity = 100,
                    UnitId = units[1].Id,
                },
                new()
                {
                    ShoppingListId = shoppingLists[1].Id,
                    Name = "Sos",
                    Quantity = 30,
                    UnitId = units[6].Id,
                },
            };

        context.ShoppingListItems.AddRange(shoppingListItems);

        // var followers = new List<UserFollowing>
        //     {
        //         new()
        //         {
        //             ObserverId = users[0].Id,
        //             TargetId = users[1].Id,
        //         },
        //         new()
        //         {
        //             ObserverId = users[2].Id,
        //             TargetId = users[1].Id,
        //         }
        //     };

        // context.UserFollowings.AddRange(followers);

        // var favorites = new List<UserFavoriteRecipe>
        //     {
        //         new()
        //         {
        //             UserId = users[0].Id,
        //             RecipeId = recipes[1].Id,
        //         },
        //         new()
        //         {
        //             UserId = users[1].Id,
        //             RecipeId = recipes[2].Id,
        //         }
        //     };

        // context.UserFavoriteRecipes.AddRange(favorites);
        await context.SaveChangesAsync();

    }
}
