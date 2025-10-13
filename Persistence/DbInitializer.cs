using System;
using Domain;
using Domain.Enums;
using Microsoft.AspNetCore.Identity;

namespace Persistence;

public class DbInitializer
{
    public static async Task SeedData(AppDbContext context, UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
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

        bool isCustomerRoleExists = await roleManager.RoleExistsAsync(StaticUserRoles.CREATOR);
        bool isAdminRoleExists = await roleManager.RoleExistsAsync(StaticUserRoles.ADMIN);

        if (!isCustomerRoleExists)
            await roleManager.CreateAsync(new IdentityRole(StaticUserRoles.CREATOR));

        if (!isAdminRoleExists) 
            await roleManager.CreateAsync(new IdentityRole(StaticUserRoles.ADMIN));

        if (userManager.Users.Any()) return;

        var admin = new User
        {
            UserName = "admin@test.com",
            Email = "admin@test.com",
            FirstName = "Admin",
            EmailConfirmed = true,
            DateRegistered = DateTime.UtcNow
        };

        await userManager.CreateAsync(admin, "Pa$$w0rd");
        await userManager.AddToRoleAsync(admin, StaticUserRoles.ADMIN);

        var users = new List<User>
        {
            new() {
                UserName = "anna@test.com",
                Email = "anna@test.com",
                FirstName = "Anna",
                LastName = "Kowalska",
                Allergens = [allergens[1], allergens[2], allergens[10], allergens[12]],
                EmailConfirmed = true,
                DateRegistered = DateTime.UtcNow.AddMonths(2)
            },
            new() {
                UserName = "antoni@test.com",
                Email = "antoni@test.com",
                FirstName = "Antoni",
                LastName = "Kowalewski",
                EmailConfirmed = true,
                DateRegistered = DateTime.UtcNow
            },
            new() {
                UserName = "tomek@test.com",
                Email = "tomek@test.com",
                FirstName = "Tomek",
                LastName = "Kowaleski",
                Allergens = [allergens[2]],
                EmailConfirmed = true,
                DateRegistered = DateTime.UtcNow.AddMonths(3)

            },
            new() {
                UserName = "emma.smith@test.com",
                Email = "emma.smith@test.com",
                FirstName = "Emma",
                LastName = "Smith",
                Allergens = [allergens[1], allergens[2], allergens[10], allergens[12]],
                EmailConfirmed = true,
                DateRegistered = DateTime.UtcNow.AddMonths(2)
            },
            new() {
                UserName = "oliver.johnson@test.com",
                Email = "oliver.johnson@test.com",
                FirstName = "Oliver",
                LastName = "Johnson",
                EmailConfirmed = true,
                DateRegistered = DateTime.UtcNow
            },
            new() {
                UserName = "liam.williams@test.com",
                Email = "liam.williams@test.com",
                FirstName = "Liam",
                LastName = "Williams",
                Allergens = [allergens[2]],
                EmailConfirmed = true,
                DateRegistered = DateTime.UtcNow.AddMonths(3)
            },
            new() {
                UserName = "ava.brown@test.com",
                Email = "ava.brown@test.com",
                FirstName = "Ava",
                LastName = "Brown",
                Allergens = [allergens[1], allergens[4], allergens[9]],
                EmailConfirmed = true,
                DateRegistered = DateTime.UtcNow.AddMonths(1)
            },
            new() {
                UserName = "noah.jones@test.com",
                Email = "noah.jones@test.com",
                FirstName = "Noah",
                LastName = "Jones",
                EmailConfirmed = true,
                DateRegistered = DateTime.UtcNow.AddMonths(-1)
            },
            new() {
                UserName = "sophia.miller@test.com",
                Email = "sophia.miller@test.com",
                FirstName = "Sophia",
                LastName = "Miller",
                Allergens = [allergens[3], allergens[7]],
                EmailConfirmed = true,
                DateRegistered = DateTime.UtcNow.AddDays(-10)
            },
            new() {
                UserName = "james.davis@test.com",
                Email = "james.davis@test.com",
                FirstName = "James",
                LastName = "Davis",
                EmailConfirmed = true,
                DateRegistered = DateTime.UtcNow.AddMonths(4)
            },
            new() {
                UserName = "mia.wilson@test.com",
                Email = "mia.wilson@test.com",
                FirstName = "Mia",
                LastName = "Wilson",
                Allergens = [allergens[1]],
                EmailConfirmed = true,
                DateRegistered = DateTime.UtcNow.AddMonths(5)
            },
            new() {
                UserName = "benjamin.moore@test.com",
                Email = "benjamin.moore@test.com",
                FirstName = "Benjamin",
                LastName = "Moore",
                EmailConfirmed = true,
                DateRegistered = DateTime.UtcNow.AddDays(-45)
            },
            new() {
                UserName = "amelia.taylor@test.com",
                Email = "amelia.taylor@test.com",
                FirstName = "Amelia",
                LastName = "Taylor",
                Allergens = [allergens[0], allergens[6]],
                EmailConfirmed = true,
                DateRegistered = DateTime.UtcNow.AddMonths(2)
            },
            new() {
                UserName = "lucas.anderson@test.com",
                Email = "lucas.anderson@test.com",
                FirstName = "Lucas",
                LastName = "Anderson",
                EmailConfirmed = true,
                DateRegistered = DateTime.UtcNow.AddMonths(-3)
            },
            new() {
                UserName = "harper.thomas@test.com",
                Email = "harper.thomas@test.com",
                FirstName = "Harper",
                LastName = "Thomas",
                Allergens = [allergens[5]],
                EmailConfirmed = true,
                DateRegistered = DateTime.UtcNow.AddDays(-20)
            },
            new() {
                UserName = "ethan.jackson@test.com",
                Email = "ethan.jackson@test.com",
                FirstName = "Ethan",
                LastName = "Jackson",
                EmailConfirmed = true,
                DateRegistered = DateTime.UtcNow.AddMonths(1)
            },
            new() {
                UserName = "isabella.white@test.com",
                Email = "isabella.white@test.com",
                FirstName = "Isabella",
                LastName = "White",
                EmailConfirmed = true,
                DateRegistered = DateTime.UtcNow.AddDays(-5)
            },
            new() {
                UserName = "alexander.harris@test.com",
                Email = "alexander.harris@test.com",
                FirstName = "Alexander",
                LastName = "Harris",
                Allergens = [allergens[8], allergens[9]],
                EmailConfirmed = true,
                DateRegistered = DateTime.UtcNow.AddMonths(-2)
            },
            new() {
                UserName = "charlotte.martin@test.com",
                Email = "charlotte.martin@test.com",
                FirstName = "Charlotte",
                LastName = "Martin",
                EmailConfirmed = true,
                DateRegistered = DateTime.UtcNow.AddMonths(3)
            },
            new() {
                UserName = "william.thompson@test.com",
                Email = "william.thompson@test.com",
                FirstName = "William",
                LastName = "Thompson",
                Allergens = [allergens[1], allergens[7]],
                EmailConfirmed = true,
                DateRegistered = DateTime.UtcNow.AddMonths(4)
            },
            new() {
                UserName = "evelyn.garcia@test.com",
                Email = "evelyn.garcia@test.com",
                FirstName = "Evelyn",
                LastName = "Garcia",
                EmailConfirmed = true,
                DateRegistered = DateTime.UtcNow.AddMonths(-4)
            },
            new() {
                UserName = "henry.martinez@test.com",
                Email = "henry.martinez@test.com",
                FirstName = "Henry",
                LastName = "Martinez",
                EmailConfirmed = true,
                DateRegistered = DateTime.UtcNow.AddMonths(6)
            },
            new() {
                UserName = "ella.robinson@test.com",
                Email = "ella.robinson@test.com",
                FirstName = "Ella",
                LastName = "Robinson",
                Allergens = [allergens[10]],
                EmailConfirmed = true,
                DateRegistered = DateTime.UtcNow.AddDays(-60)
            },
            new() {
                UserName = "jack.clark@test.com",
                Email = "jack.clark@test.com",
                FirstName = "Jack",
                LastName = "Clark",
                EmailConfirmed = true,
                DateRegistered = DateTime.UtcNow.AddMonths(5)
            },
            new() {
                UserName = "scarlett.rodriguez@test.com",
                Email = "scarlett.rodriguez@test.com",
                FirstName = "Scarlett",
                LastName = "Rodriguez",
                Allergens = [allergens[3], allergens[12]],
                EmailConfirmed = true,
                DateRegistered = DateTime.UtcNow.AddMonths(-1)
            },
            new() {
                UserName = "daniel.lewis@test.com",
                Email = "daniel.lewis@test.com",
                FirstName = "Daniel",
                LastName = "Lewis",
                EmailConfirmed = true,
                DateRegistered = DateTime.UtcNow.AddMonths(1)
            },
            new() {
                UserName = "grace.lee@test.com",
                Email = "grace.lee@test.com",
                FirstName = "Grace",
                LastName = "Lee",
                EmailConfirmed = true,
                DateRegistered = DateTime.UtcNow.AddDays(-15)
            },
            new() {
                UserName = "michael.walker@test.com",
                Email = "michael.walker@test.com",
                FirstName = "Michael",
                LastName = "Walker",
                Allergens = [allergens[5], allergens[9]],
                EmailConfirmed = true,
                DateRegistered = DateTime.UtcNow.AddMonths(-2)
            },
            new() {
                UserName = "ella.hall@test.com",
                Email = "ella.hall@test.com",
                FirstName = "Ella",
                LastName = "Hall",
                EmailConfirmed = true,
                DateRegistered = DateTime.UtcNow.AddMonths(7)
            },
            new() {
                UserName = "samuel.allen@test.com",
                Email = "samuel.allen@test.com",
                FirstName = "Samuel",
                LastName = "Allen",
                EmailConfirmed = true,
                DateRegistered = DateTime.UtcNow.AddMonths(2)
            },
            new() {
                UserName = "luna.young@test.com",
                Email = "luna.young@test.com",
                FirstName = "Luna",
                LastName = "Young",
                Allergens = [allergens[2], allergens[8]],
                EmailConfirmed = true,
                DateRegistered = DateTime.UtcNow.AddDays(-30)
            },
            new() {
                UserName = "jacob.king@test.com",
                Email = "jacob.king@test.com",
                FirstName = "Jacob",
                LastName = "King",
                EmailConfirmed = true,
                DateRegistered = DateTime.UtcNow.AddMonths(4)
            },
            new() {
                UserName = "aria.wright@test.com",
                Email = "aria.wright@test.com",
                FirstName = "Aria",
                LastName = "Wright",
                Allergens = [allergens[0], allergens[1]],
                EmailConfirmed = true,
                DateRegistered = DateTime.UtcNow.AddMonths(3)
            }
        };
        foreach (var user in users)
        {
            await userManager.CreateAsync(user, "Pa$$w0rd");
            await userManager.AddToRoleAsync(user, StaticUserRoles.CREATOR);
        }
        
        if (context.Recipes.Any()) return;

        var recipes = new List<Recipe>
        {
            // ----- USER 0 -----
            new()
            {
                Title = "Spaghetti Carbonara",
                UserId = users[0].Id,
                Description = "A classic Italian pasta dish made with pancetta, eggs, and pecorino cheese. Rich, creamy, and ready in under 30 minutes.",
                Servings = 4,
                PreparationTime = 25,
                Difficulty = RecipeDifficulty.Medium,
                IsVisible = true,
                CreatedAt = DateTime.UtcNow.AddDays(-30),
                Tags = { tags[8], tags[11] },
                Allergens = [allergens[5]]
            },
            new()
            {
                Title = "Avocado Toast Deluxe",
                UserId = users[0].Id,
                Description = "A healthy and satisfying toast topped with creamy avocado, poached eggs, and chili flakes for a spicy kick.",
                Servings = 2,
                PreparationTime = 10,
                Difficulty = RecipeDifficulty.Easy,
                IsVisible = true,
                CreatedAt = DateTime.UtcNow,
                Tags = { tags[6], tags[10], tags[12], tags[13] },
                Allergens = [allergens[0], allergens[4]]
            },
            new()
            {
                Title = "Garlic Shrimp Pasta",
                UserId = users[0].Id,
                Description = "Juicy shrimp tossed in a buttery garlic sauce with linguine — an elegant yet simple dinner.",
                Servings = 3,
                PreparationTime = 20,
                Difficulty = RecipeDifficulty.Medium,
                IsVisible = true,
                CreatedAt = DateTime.UtcNow.AddDays(-5),
                Tags = { tags[8], tags[12] },
                Allergens = [allergens[7], allergens[21]]
            },
            new()
            {
                Title = "Classic Pancakes",
                UserId = users[10].Id,
                Description = "Soft and fluffy pancakes perfect for a weekend breakfast, served with maple syrup and fresh fruit.",
                Servings = 4,
                PreparationTime = 20,
                Difficulty = RecipeDifficulty.Easy,
                IsVisible = true,
                CreatedAt = DateTime.UtcNow.AddDays(-10),
                Tags = { tags[6], tags[12], tags[14] },
                Allergens = [allergens[4], allergens[3], allergens[0]]
            },
            new()
            {
                Title = "Cauliflower Curry",
                UserId = users[10].Id,
                Description = "An Indian-inspired vegan curry made with cauliflower, coconut milk, and aromatic spices.",
                Servings = 4,
                PreparationTime = 35,
                Difficulty = RecipeDifficulty.Medium,
                IsVisible = true,
                CreatedAt = DateTime.UtcNow.AddDays(-20),
                Tags = { tags[0], tags[11] }
            },

            // ----- USER 1 -----
            new()
            {
                Title = "Chicken Tikka Masala",
                UserId = users[1].Id,
                Description = "Marinated chicken in a creamy tomato sauce, full of warm Indian spices.",
                Servings = 4,
                PreparationTime = 40,
                Difficulty = RecipeDifficulty.Hard,
                IsVisible = true,
                CreatedAt = DateTime.UtcNow.AddMonths(-1),
                Tags = { tags[8], tags[5] },
                Allergens = [allergens[13]]
            },
            new()
            {
                Title = "Grilled Chicken Salad",
                UserId = users[1].Id,
                Description = "Crisp lettuce, grilled chicken, and a homemade lemon dressing — light yet filling.",
                Servings = 2,
                PreparationTime = 25,
                Difficulty = RecipeDifficulty.Easy,
                IsVisible = true,
                CreatedAt = DateTime.UtcNow.AddDays(-12),
                Tags = { tags[7], tags[13], tags[5] },
                Allergens = [allergens[14]]
            },
            new()
            {
                Title = "Baked Salmon",
                UserId = users[11].Id,
                Description = "Oven-baked salmon with a tangy lemon-herb crust. Healthy, juicy, and ready in no time.",
                Servings = 2,
                PreparationTime = 25,
                Difficulty = RecipeDifficulty.Easy,
                IsVisible = true,
                CreatedAt = DateTime.UtcNow,
                Tags = { tags[8], tags[13] },
                Allergens = [allergens[5]]
            },
            new()
            {
                Title = "Banana Smoothie",
                UserId = users[11].Id,
                Description = "Creamy banana smoothie blended with milk and honey. Great for breakfast or a quick energy boost.",
                Servings = 1,
                PreparationTime = 5,
                Difficulty = RecipeDifficulty.Easy,
                IsVisible = true,
                CreatedAt = DateTime.UtcNow.AddDays(-3),
                Tags = { tags[6], tags[10], tags[13] },
                Allergens = [allergens[19], allergens[3]]
            },
            new()
            {
                Title = "Beef Stroganoff",
                UserId = users[1].Id,
                Description = "Tender beef strips simmered in a rich mushroom and sour cream sauce, served over egg noodles.",
                Servings = 4,
                PreparationTime = 45,
                Difficulty = RecipeDifficulty.Medium,
                IsVisible = true,
                CreatedAt = DateTime.UtcNow.AddDays(-50),
                Tags = { tags[8], tags[11] },
                Allergens = [allergens[3], allergens[5]]
            },

            // ----- USER 2 -----
            new()
            {
                Title = "Vegan Chili",
                UserId = users[2].Id,
                Description = "A hearty bean chili with vegetables and spices — 100% vegan, full of flavor.",
                Servings = 4,
                PreparationTime = 40,
                Difficulty = RecipeDifficulty.Medium,
                IsVisible = true,
                CreatedAt = DateTime.UtcNow.AddDays(-7),
                Tags = { tags[0], tags[11], tags[8] }
            },
            new()
            {
                Title = "Tomato Basil Soup",
                UserId = users[2].Id,
                Description = "A smooth and creamy tomato soup made with fresh basil — perfect for a cozy night.",
                Servings = 3,
                PreparationTime = 30,
                Difficulty = RecipeDifficulty.Medium,
                IsVisible = true,
                CreatedAt = DateTime.UtcNow,
                Tags = { tags[7], tags[1] },
                Allergens = [allergens[14], allergens[3]]
            },
            new()
            {
                Title = "Chocolate Mug Cake",
                UserId = users[2].Id,
                Description = "A soft, rich chocolate cake that cooks right in your mug — perfect for instant dessert cravings.",
                Servings = 1,
                PreparationTime = 5,
                Difficulty = RecipeDifficulty.Easy,
                IsVisible = true,
                CreatedAt = DateTime.UtcNow,
                Tags = { tags[9], tags[12] },
                Allergens = [allergens[4], allergens[3], allergens[20]]
            },
            new()
            {
                Title = "Vegan Buddha Bowl",
                UserId = users[2].Id,
                Description = "A colorful bowl filled with quinoa, roasted vegetables, chickpeas, and tahini dressing.",
                Servings = 2,
                PreparationTime = 35,
                Difficulty = RecipeDifficulty.Medium,
                IsVisible = true,
                CreatedAt = DateTime.UtcNow.AddDays(-2),
                Tags = { tags[0], tags[13], tags[11] },
            },
            new()
            {
                Title = "Mushroom Risotto",
                UserId = users[12].Id,
                Description = "Creamy Italian rice dish with sautéed mushrooms and parmesan. Perfectly comforting and rich.",
                Servings = 3,
                PreparationTime = 45,
                Difficulty = RecipeDifficulty.Hard,
                IsVisible = true,
                CreatedAt = DateTime.UtcNow.AddDays(-14),
                Tags = { tags[8], tags[11] },
                Allergens = [allergens[5], allergens[3]]
            },
            new()
            {
                Title = "Lemon Herb Chicken",
                UserId = users[13].Id,
                Description = "Whole chicken roasted with lemon, garlic and a mix of fresh herbs for juicy, crispy results.",
                Servings = 6,
                PreparationTime = 90,
                Difficulty = RecipeDifficulty.Medium,
                IsVisible = true,
                CreatedAt = DateTime.UtcNow.AddDays(-40),
                Tags = { tags[8], tags[2] }
            },
            new()
            {
                Title = "Szechuan Noodles",
                UserId = users[14].Id,
                Description = "Spicy Szechuan-style stir-fry with chewy noodles, crisp vegetables and a bold chili-pepper sauce.",
                Servings = 3,
                PreparationTime = 30,
                Difficulty = RecipeDifficulty.Medium,
                IsVisible = true,
                CreatedAt = DateTime.UtcNow.AddDays(-35),
                Tags = { tags[5], tags[11] },
                Allergens = [allergens[3]]
            },
            new()
            {
                Title = "Quinoa Salad",
                UserId = users[2].Id,
                Description = "A bright, protein-packed salad with quinoa, olives, cucumber, tomato and feta, dressed in lemon-oregano vinaigrette.",
                Servings = 4,
                PreparationTime = 25,
                Difficulty = RecipeDifficulty.Easy,
                IsVisible = true,
                CreatedAt = DateTime.UtcNow.AddDays(-30),
                Tags = { tags[0], tags[7] },
                Allergens = [allergens[4]]
            },
            new()
            {
                Title = "Beef and Guinness Stew",
                UserId = users[3].Id,
                Description = "Slow-cooked beef stew braised in Guinness with root vegetables and a rich, savory gravy.",
                Servings = 6,
                PreparationTime = 180,
                Difficulty = RecipeDifficulty.Hard,
                IsVisible = true,
                CreatedAt = DateTime.UtcNow.AddDays(-28),
                Tags = { tags[8], tags[1] },
            },
            new()
            {
                Title = "Spinach Stuffed Shells",
                UserId = users[4].Id,
                Description = "Large pasta shells filled with a creamy spinach and ricotta mixture, baked in marinara and topped with mozzarella.",
                Servings = 6,
                PreparationTime = 60,
                Difficulty = RecipeDifficulty.Medium,
                IsVisible = true,
                CreatedAt = DateTime.UtcNow.AddDays(-26),
                Tags = { tags[11], tags[12] },
                Allergens = [allergens[4], allergens[3]]
            },
            new()
            {
                Title = "Thai Green Curry",
                UserId = users[15].Id,
                Description = "Fragrant Thai green curry with crispy tofu, bamboo shoots, bell peppers and creamy coconut milk.",
                Servings = 4,
                PreparationTime = 35,
                Difficulty = RecipeDifficulty.Medium,
                IsVisible = true,
                CreatedAt = DateTime.UtcNow.AddDays(-24),
                Tags = { tags[0], tags[5] },
                Allergens = [allergens[13]]
            },
            new()
            {
                Title = "Maple-Glazed Pork",
                UserId = users[16].Id,
                Description = "Tender pork tenderloin roasted with a sweet and savory maple glaze and roasted root vegetables.",
                Servings = 4,
                PreparationTime = 50,
                Difficulty = RecipeDifficulty.Medium,
                IsVisible = true,
                CreatedAt = DateTime.UtcNow.AddDays(-22),
                Tags = { tags[8], tags[2] }
            },
            new()
            {
                Title = "Black Bean Burger",
                UserId = users[17].Id,
                Description = "Hearty vegetarian burgers made from black beans, smoked paprika, and oats, served on toasted buns.",
                Servings = 4,
                PreparationTime = 30,
                Difficulty = RecipeDifficulty.Easy,
                IsVisible = true,
                CreatedAt = DateTime.UtcNow.AddDays(-20),
                Tags = { tags[0], tags[6] },
                Allergens = [allergens[0]]
            },
            new()
            {
                Title = "Orange Panna Cotta",
                UserId = users[3].Id,
                Description = "Silky panna cotta infused with orange zest and cardamom, served with a citrus compote.",
                Servings = 4,
                PreparationTime = 240,
                Difficulty = RecipeDifficulty.Medium,
                IsVisible = true,
                CreatedAt = DateTime.UtcNow.AddDays(-18),
                Tags = { tags[9], tags[14] },
                Allergens = [allergens[3], allergens[4]]
            },
            new()
            {
                Title = "Vegetable and Halloumi",
                UserId = users[4].Id,
                Description = "Summer skewers of charred peppers, zucchini, mushrooms and halloumi with a lemon-herb dressing.",
                Servings = 4,
                PreparationTime = 25,
                Difficulty = RecipeDifficulty.Easy,
                IsVisible = true,
                CreatedAt = DateTime.UtcNow.AddDays(-16),
                Tags = { tags[7], tags[13] },
                Allergens = [allergens[4]]
            },
            new()
            {
                Title = "Butternut Squash Risotto",
                UserId = users[0].Id,
                Description = "Creamy risotto studded with roasted butternut squash and finished with butter and parmesan.",
                Servings = 4,
                PreparationTime = 50,
                Difficulty = RecipeDifficulty.Medium,
                IsVisible = true,
                CreatedAt = DateTime.UtcNow.AddDays(-14),
                Tags = { tags[11], tags[8] },
                Allergens = [allergens[5]]
            },
            new()
            {
                Title = "Cinnamon Apple Oats",
                UserId = users[1].Id,
                Description = "Make-ahead oats soaked overnight with grated apple, cinnamon and a touch of maple syrup.",
                Servings = 2,
                PreparationTime = 10,
                Difficulty = RecipeDifficulty.Easy,
                IsVisible = true,
                CreatedAt = DateTime.UtcNow.AddDays(-12),
                Tags = { tags[6], tags[10] },
                Allergens = [allergens[19]]
            },
            new()
            {
                Title = "Moroccan Chickpea Stew",
                UserId = users[2].Id,
                Description = "A warming North African-inspired stew with chickpeas, tomatoes, apricots and warming spices.",
                Servings = 4,
                PreparationTime = 55,
                Difficulty = RecipeDifficulty.Medium,
                IsVisible = true,
                CreatedAt = DateTime.UtcNow.AddDays(-10),
                Tags = { tags[0], tags[11] }
            },
            new()
            {
                Title = "Seared Scallops",
                UserId = users[3].Id,
                Description = "Perfectly seared scallops served on a silky pea purée with lemon and mint.",
                Servings = 2,
                PreparationTime = 20,
                Difficulty = RecipeDifficulty.Medium,
                IsVisible = true,
                CreatedAt = DateTime.UtcNow.AddDays(-8),
                Tags = { tags[8], tags[12] },
                Allergens = [allergens[7]]
            },
            new()
            {
                Title = "Roasted Beet with Salad",
                UserId = users[4].Id,
                Description = "Earthy roasted beets paired with tangy goat cheese, arugula and a balsamic glaze.",
                Servings = 3,
                PreparationTime = 40,
                Difficulty = RecipeDifficulty.Easy,
                IsVisible = true,
                CreatedAt = DateTime.UtcNow.AddDays(-6),
                Tags = { tags[7], tags[13] },
                Allergens = [allergens[4]]
            },
            new()
            {
                Title = "Spicy Korean Beef Bowls",
                UserId = users[0].Id,
                Description = "Quick stir-fried beef in a gochujang-based sauce, served over steamed rice with crisp cucumber and kimchi.",
                Servings = 4,
                PreparationTime = 25,
                Difficulty = RecipeDifficulty.Easy,
                IsVisible = true,
                CreatedAt = DateTime.UtcNow.AddDays(-4),
                Tags = { tags[5], tags[8] }
            },
            new()
            {
                Title = "Lentil Shepherd's Pie",
                UserId = users[1].Id,
                Description = "A vegetarian shepherd's pie with a spiced lentil base and creamy sweet potato topping.",
                Servings = 6,
                PreparationTime = 75,
                Difficulty = RecipeDifficulty.Medium,
                IsVisible = true,
                CreatedAt = DateTime.UtcNow.AddDays(-3),
                Tags = { tags[0], tags[11] }
            },
            new()
            {
                Title = "Caramelized Onion Tart",
                UserId = users[2].Id,
                Description = "A flaky tart filled with slow-cooked caramelized onions and melted gruyere cheese.",
                Servings = 6,
                PreparationTime = 70,
                Difficulty = RecipeDifficulty.Medium,
                IsVisible = true,
                CreatedAt = DateTime.UtcNow.AddDays(-2),
                Tags = { tags[9], tags[12] },
                Allergens = [allergens[4], allergens[3]]
            },
            new()
            {
                Title = "Coconut Chia Pudding",
                UserId = users[3].Id,
                Description = "Light and refreshing chia pudding made with coconut milk and topped with fresh mango slices.",
                Servings = 2,
                PreparationTime = 15,
                Difficulty = RecipeDifficulty.Easy,
                IsVisible = true,
                CreatedAt = DateTime.UtcNow.AddDays(-1),
                Tags = { tags[6], tags[10] }
            }
        };
        context.Recipes.AddRange(recipes);

        var reviews = new List<Review>
        {
            new() { RecipeId = recipes[0].Id, UserId = users[1].Id, Rating = 5, Comment = "Absolutely delicious! I will make it again.", CreatedAt = DateTime.UtcNow.AddDays(-10), IsDeleted = false },
            new() { RecipeId = recipes[0].Id, UserId = users[2].Id, Rating = 4, Comment = "Very tasty, but I added extra cheese.", CreatedAt = DateTime.UtcNow.AddDays(-8), IsDeleted = false },
            new() { RecipeId = recipes[0].Id, UserId = users[3].Id, Rating = 5, Comment = "Perfect recipe! Easy and flavorful.", CreatedAt = DateTime.UtcNow.AddDays(-5), IsDeleted = false },

            // Recipe 2 - Avocado Toast Deluxe (author: users[0])
            new() { RecipeId = recipes[1].Id, UserId = users[1].Id, Rating = 4, Comment = "Healthy and yummy!", CreatedAt = DateTime.UtcNow.AddDays(-7), IsDeleted = false },
            new() { RecipeId = recipes[1].Id, UserId = users[2].Id, Rating = 5, Comment = "Super easy and delicious breakfast!", CreatedAt = DateTime.UtcNow.AddDays(-4), IsDeleted = false },
            new() { RecipeId = recipes[1].Id, UserId = users[3].Id, Rating = 3, Comment = "Good, but I prefer more seasoning.", CreatedAt = DateTime.UtcNow.AddDays(-2), IsDeleted = false },

            // Recipe 3 - Garlic Shrimp Pasta (author: users[0])
            new() { RecipeId = recipes[2].Id, UserId = users[1].Id, Rating = 5, Comment = "Loved it! The garlic flavor is perfect.", CreatedAt = DateTime.UtcNow.AddDays(-6), IsDeleted = false },
            new() { RecipeId = recipes[2].Id, UserId = users[2].Id, Rating = 4, Comment = "Tasty but I added some chili flakes for extra kick.", CreatedAt = DateTime.UtcNow.AddDays(-3), IsDeleted = false },
            new() { RecipeId = recipes[2].Id, UserId = users[3].Id, Rating = 5, Comment = "Excellent recipe, will cook again!", CreatedAt = DateTime.UtcNow.AddDays(-1), IsDeleted = false },

            // Recipe 4 - Classic Pancakes (author: users[10])
            new() { RecipeId = recipes[3].Id, UserId = users[0].Id, Rating = 4, Comment = "Fluffy and soft! Kids loved it.", CreatedAt = DateTime.UtcNow.AddDays(-9), IsDeleted = false },
            new() { RecipeId = recipes[3].Id, UserId = users[1].Id, Rating = 5, Comment = "Perfect for weekend breakfast!", CreatedAt = DateTime.UtcNow.AddDays(-7), IsDeleted = false },
            new() { RecipeId = recipes[3].Id, UserId = users[2].Id, Rating = 4, Comment = "Great recipe, will try with blueberries next time.", CreatedAt = DateTime.UtcNow.AddDays(-5), IsDeleted = false },

            // Recipe 5 - Cauliflower Curry (author: users[10])
            new() { RecipeId = recipes[4].Id, UserId = users[0].Id, Rating = 5, Comment = "Rich and flavorful vegan curry!", CreatedAt = DateTime.UtcNow.AddDays(-6), IsDeleted = false },
            new() { RecipeId = recipes[4].Id, UserId = users[1].Id, Rating = 4, Comment = "Really good, added some extra spices.", CreatedAt = DateTime.UtcNow.AddDays(-4), IsDeleted = false },
            new() { RecipeId = recipes[4].Id, UserId = users[2].Id, Rating = 5, Comment = "My new favorite vegan recipe.", CreatedAt = DateTime.UtcNow.AddDays(-2), IsDeleted = false },

            // Recipe 6 - Chicken Tikka Masala (author: users[1])
            new() { RecipeId = recipes[5].Id, UserId = users[0].Id, Rating = 5, Comment = "Authentic flavor! Loved it.", CreatedAt = DateTime.UtcNow.AddDays(-8), IsDeleted = false },
            new() { RecipeId = recipes[5].Id, UserId = users[2].Id, Rating = 4, Comment = "Very good, but I made it less spicy.", CreatedAt = DateTime.UtcNow.AddDays(-5), IsDeleted = false },
            new() { RecipeId = recipes[5].Id, UserId = users[3].Id, Rating = 5, Comment = "Excellent dish! Will cook again.", CreatedAt = DateTime.UtcNow.AddDays(-3), IsDeleted = false },
            // Recipe 7 - Grilled Chicken Salad (author: users[1])
            new() { RecipeId = recipes[6].Id, UserId = users[0].Id, Rating = 5, Comment = "Light, fresh, and very tasty!", CreatedAt = DateTime.UtcNow.AddDays(-6), IsDeleted = false },
            new() { RecipeId = recipes[6].Id, UserId = users[2].Id, Rating = 4, Comment = "Perfect for a summer lunch.", CreatedAt = DateTime.UtcNow.AddDays(-4), IsDeleted = false },
            new() { RecipeId = recipes[6].Id, UserId = users[3].Id, Rating = 5, Comment = "Loved the lemon dressing!", CreatedAt = DateTime.UtcNow.AddDays(-2), IsDeleted = false },

            // Recipe 8 - Baked Salmon (author: users[11])
            new() { RecipeId = recipes[7].Id, UserId = users[0].Id, Rating = 5, Comment = "Juicy and perfectly seasoned.", CreatedAt = DateTime.UtcNow.AddDays(-7), IsDeleted = false },
            new() { RecipeId = recipes[7].Id, UserId = users[1].Id, Rating = 4, Comment = "Very healthy and simple to cook.", CreatedAt = DateTime.UtcNow.AddDays(-5), IsDeleted = false },
            new() { RecipeId = recipes[7].Id, UserId = users[2].Id, Rating = 5, Comment = "My family loved it!", CreatedAt = DateTime.UtcNow.AddDays(-3), IsDeleted = false },

            // Recipe 9 - Banana Smoothie (author: users[11])
            new() { RecipeId = recipes[8].Id, UserId = users[0].Id, Rating = 4, Comment = "Quick and tasty breakfast.", CreatedAt = DateTime.UtcNow.AddDays(-6), IsDeleted = false },
            new() { RecipeId = recipes[8].Id, UserId = users[1].Id, Rating = 5, Comment = "Perfect for mornings on the go.", CreatedAt = DateTime.UtcNow.AddDays(-4), IsDeleted = false },
            new() { RecipeId = recipes[8].Id, UserId = users[3].Id, Rating = 4, Comment = "Nice and creamy, my kids loved it.", CreatedAt = DateTime.UtcNow.AddDays(-2), IsDeleted = false },

            // Recipe 10 - Beef Stroganoff (author: users[1])
            new() { RecipeId = recipes[9].Id, UserId = users[0].Id, Rating = 5, Comment = "Rich and comforting meal.", CreatedAt = DateTime.UtcNow.AddDays(-10), IsDeleted = false },
            new() { RecipeId = recipes[9].Id, UserId = users[2].Id, Rating = 4, Comment = "Tasty but a bit heavy.", CreatedAt = DateTime.UtcNow.AddDays(-7), IsDeleted = false },
            new() { RecipeId = recipes[9].Id, UserId = users[3].Id, Rating = 5, Comment = "Excellent! Perfect for dinner parties.", CreatedAt = DateTime.UtcNow.AddDays(-5), IsDeleted = false },

            // Recipe 11 - Vegan Chili (author: users[2])
            new() { RecipeId = recipes[10].Id, UserId = users[0].Id, Rating = 5, Comment = "Hearty and full of flavor.", CreatedAt = DateTime.UtcNow.AddDays(-8), IsDeleted = false },
            new() { RecipeId = recipes[10].Id, UserId = users[1].Id, Rating = 4, Comment = "Really good, added some extra spices.", CreatedAt = DateTime.UtcNow.AddDays(-5), IsDeleted = false },
            new() { RecipeId = recipes[10].Id, UserId = users[3].Id, Rating = 5, Comment = "Perfect for cold evenings.", CreatedAt = DateTime.UtcNow.AddDays(-3), IsDeleted = false },

            // Recipe 12 - Tomato Basil Soup (author: users[2])
            new() { RecipeId = recipes[11].Id, UserId = users[0].Id, Rating = 5, Comment = "Smooth and delicious!", CreatedAt = DateTime.UtcNow.AddDays(-6), IsDeleted = false },
            new() { RecipeId = recipes[11].Id, UserId = users[1].Id, Rating = 4, Comment = "Nice and cozy soup.", CreatedAt = DateTime.UtcNow.AddDays(-4), IsDeleted = false },
            new() { RecipeId = recipes[11].Id, UserId = users[3].Id, Rating = 5, Comment = "Loved it! Added some croutons.", CreatedAt = DateTime.UtcNow.AddDays(-2), IsDeleted = false },

        };

        context.Reviews.AddRange(reviews);

        var steps = new List<Step>
        {
            new() { RecipeId = recipes[0].Id, Description = "Bring a large pot of salted water to a rolling boil. Add spaghetti and cook until al dente. Drain and reserve 1 cup of cooking water." },
            new() { RecipeId = recipes[0].Id, Description = "Meanwhile, fry diced pancetta in a skillet until golden and crispy. Remove from heat and let it cool slightly." },
            new() { RecipeId = recipes[0].Id, Description = "Whisk eggs and grated cheese in a bowl. Toss with the pasta, pancetta, and some of the hot cooking water to create a creamy sauce. Serve immediately with black pepper." },

            new() { RecipeId = recipes[1].Id, Description = "Cut chicken into bite-sized pieces and marinate in yogurt mixed with spices for at least 30 minutes." },
            new() { RecipeId = recipes[1].Id, Description = "Sauté onions, garlic, and ginger in oil. Add tomato puree and cook until fragrant, then stir in cream and the cooked chicken. Simmer for 10 minutes." },
            new() { RecipeId = recipes[1].Id, Description = "Garnish with cilantro and serve with steamed rice or naan bread." },

            new() { RecipeId = recipes[2].Id, Description = "Mash ripe avocado with lemon juice, salt, and pepper. Toast bread until golden, spread avocado, and top with poached eggs and chili flakes." },

            new() { RecipeId = recipes[3].Id, Description = "Whisk flour, sugar, and baking powder. Add eggs and milk, mixing until smooth. Fry in butter until golden on both sides, then serve with syrup." },

            new() { RecipeId = recipes[4].Id, Description = "Sauté onions with curry paste, then add cauliflower, coconut milk, and chickpeas. Simmer gently for 25–30 minutes until thick and aromatic." },

            new() { RecipeId = recipes[5].Id, Description = "Grill marinated chicken pieces. Prepare the sauce separately, then combine and simmer for 10 minutes. Serve with basmati rice." },

            new() { RecipeId = recipes[6].Id, Description = "Grill seasoned chicken breast. Combine chopped lettuce, tomato, cucumber, and lemon dressing. Slice the chicken and mix into salad." },

            new() { RecipeId = recipes[7].Id, Description = "Preheat oven to 180°C. Season salmon with lemon juice and herbs. Bake for 20 minutes and serve with vegetables." },

            new() { RecipeId = recipes[8].Id, Description = "Blend banana, milk, and honey until smooth. Serve immediately with ice cubes if desired." },

            new() { RecipeId = recipes[9].Id, Description = "Brown beef strips, add mushrooms and onions, deglaze with broth, stir in sour cream, and simmer until thick. Serve over egg noodles." },

            new() { RecipeId = recipes[10].Id, Description = "Sauté onions, garlic, and peppers. Add beans, corn, tomatoes, and spices. Simmer for 30 minutes, stirring occasionally." },

            new() { RecipeId = recipes[11].Id, Description = "Cook chopped tomatoes with onions, basil, and cream until smooth. Blend and simmer 10 more minutes." },

            new() { RecipeId = recipes[12].Id, Description = "Mix flour, cocoa, sugar, and milk in a mug. Microwave for 90 seconds. Cool slightly before eating." },

            new() { RecipeId = recipes[13].Id, Description = "Assemble quinoa, roasted vegetables, chickpeas, and drizzle with tahini dressing. Serve warm or cold." },

            new() { RecipeId = recipes[14].Id, Description = "Toast rice in butter, slowly add broth while stirring. Add sautéed mushrooms and cheese at the end for creaminess." },
             //  Lemon Herb Roasted Chicken (recipes[existingCount + 0] => recipes[0])
            new() { RecipeId = recipes[15].Id, Description = "Preheat the oven to 425°F (220°C). Pat the whole chicken dry with paper towels to remove any excess moisture." },
            new() { RecipeId = recipes[15].Id, Description = "Season the cavity with salt and pepper, then stuff with halved lemons, a few garlic cloves and a bundle of fresh rosemary and thyme." },
            new() { RecipeId = recipes[15].Id, Description = "In a small bowl, mix softened butter with chopped herbs, minced garlic, lemon zest and a pinch of salt; gently loosen the skin over the breasts and smear half of the herb butter under the skin." },
            new() { RecipeId = recipes[15].Id, Description = "Truss the chicken legs with kitchen twine and rub the remaining herb butter all over the outside of the bird; season with salt and pepper." },
            new() { RecipeId = recipes[15].Id, Description = "Place the chicken on a rack in a roasting pan and roast for about 60–75 minutes until the internal temperature at the thickest part reaches 165°F (74°C)." },
            new() { RecipeId = recipes[15].Id, Description = "Halfway through roasting, baste the chicken with the pan juices and add root vegetables to roast alongside if desired." },
            new() { RecipeId = recipes[15].Id, Description = "Remove the chicken from the oven and let it rest for 15 minutes to allow the juices to redistribute." },
            new() { RecipeId = recipes[15].Id, Description = "Carve the chicken and serve with roasted vegetables and a spoonful of pan juices or a quick pan gravy." },

            //  Szechuan Stir-Fry Noodles
            new() { RecipeId = recipes[16].Id, Description = "Prepare the noodles according to package instructions but cook them 1 minute less than specified so they remain chewy; drain and toss with a little oil to prevent sticking." },
            new() { RecipeId = recipes[16].Id, Description = "Whisk together the sauce: soy sauce, rice vinegar, sesame oil, a splash of chicken or vegetable stock, a spoonful of chili paste and a pinch of sugar." },
            new() { RecipeId = recipes[16].Id, Description = "Heat a large wok over high heat; add oil and quickly stir-fry minced garlic, ginger, sliced scallions and dried chilies until fragrant." },
            new() { RecipeId = recipes[16].Id, Description = "Add sliced bell peppers, snow peas and julienned carrots; toss vigorously until vegetables are crisp-tender." },
            new() { RecipeId = recipes[16].Id, Description = "Stir in the cooked noodles and pour the sauce over; toss constantly so the sauce coats every strand." },
            new() { RecipeId = recipes[16].Id, Description = "Finish with a drizzle of toasted sesame oil and sprinkle with chopped peanuts and fresh cilantro." },
            new() { RecipeId = recipes[16].Id, Description = "Taste and adjust heat or salt as needed, then serve immediately while hot and smoky." },
            new() { RecipeId = recipes[16].Id, Description = "Offer chili oil and extra soy on the side for diners to customize their bowl." },

            //  Mediterranean Quinoa Salad
            new() { RecipeId = recipes[17].Id, Description = "Rinse quinoa under cold water and cook according to package instructions, then fluff with a fork and let cool to room temperature." },
            new() { RecipeId = recipes[17].Id, Description = "While quinoa cools, chop cucumber, cherry tomatoes, red onion and pitted olives into bite-sized pieces." },
            new() { RecipeId = recipes[17].Id, Description = "In a small bowl, whisk olive oil, freshly squeezed lemon juice, minced garlic, chopped oregano, salt and black pepper to create the vinaigrette." },
            new() { RecipeId = recipes[17].Id, Description = "Combine cooled quinoa with the chopped vegetables, crumbled feta and fresh parsley in a large salad bowl." },
            new() { RecipeId = recipes[17].Id, Description = "Pour the vinaigrette over the salad and toss gently to combine, making sure every bite is coated." },
            new() { RecipeId = recipes[17].Id, Description = "Taste and adjust seasoning with more lemon or salt if necessary; add a drizzle of extra virgin olive oil if desired." },
            new() { RecipeId = recipes[17].Id, Description = "Chill for 20–30 minutes to let flavors meld, then toss again before serving." },
            new() { RecipeId = recipes[17].Id, Description = "Serve as a light main or as a colorful side alongside grilled fish or chicken." },

            //  Beef and Guinness Stew
            new() { RecipeId = recipes[18].Id, Description = "Cut chuck roast into large cubes and pat dry; season generously with salt and pepper." },
            new() { RecipeId = recipes[18].Id, Description = "Heat a heavy-bottomed pot, add oil and brown the beef in batches until a deep crust forms; remove and set aside." },
            new() { RecipeId = recipes[18].Id, Description = "Sauté chopped onions, carrots and celery in the same pot, scraping up browned bits from the bottom for extra flavor." },
            new() { RecipeId = recipes[18].Id, Description = "Return the beef to the pot, add flour to lightly coat, then pour in a bottle of Guinness and enough beef stock to cover the meat." },
            new() { RecipeId = recipes[18].Id, Description = "Add thyme, bay leaves and a spoonful of tomato paste; bring to a simmer, cover and transfer to a low oven or keep on low heat for 2–3 hours until beef is fork-tender." },
            new() { RecipeId = recipes[18].Id, Description = "Stir in parsnips or potatoes during the last 40–45 minutes of cooking so they melt into the stew." },
            new() { RecipeId = recipes[18].Id, Description = "Skim excess fat, adjust seasoning and let the stew rest off heat for 10 minutes before serving." },
            new() { RecipeId = recipes[18].Id, Description = "Serve with crusty bread or buttery mashed potatoes and a sprinkle of fresh parsley." },

            //  Spinach and Ricotta Stuffed Shells
            new() { RecipeId = recipes[19].Id, Description = "Preheat oven to 375°F (190°C) and bring a large pot of salted water to a boil for the pasta shells." },
            new() { RecipeId = recipes[19].Id, Description = "Cook jumbo pasta shells until just tender, drain and let cool slightly so you can handle them." },
            new() { RecipeId = recipes[19].Id, Description = "In a bowl, combine ricotta, cooked chopped spinach (squeezed dry), grated parmesan, an egg, minced garlic, salt and pepper." },
            new() { RecipeId = recipes[19].Id, Description = "Spread a thin layer of marinara in the bottom of a baking dish, then spoon the ricotta mixture into each shell and place them seam-side up." },
            new() { RecipeId = recipes[19].Id, Description = "Pour remaining marinara over the stuffed shells, sprinkle shredded mozzarella and extra parmesan on top." },
            new() { RecipeId = recipes[19].Id, Description = "Cover with foil and bake for 25 minutes, then remove foil and bake an additional 10 minutes until cheese bubbles and browns lightly." },
            new() { RecipeId = recipes[19].Id, Description = "Let the dish rest 5 minutes before serving to let everything set slightly." },
            new() { RecipeId = recipes[19].Id, Description = "Garnish with fresh basil and serve warm with a crisp green salad." },

            //  Thai Green Curry with Tofu
            new() { RecipeId = recipes[20].Id, Description = "Press tofu for 15–20 minutes to remove excess water, then cut into cubes and toss with a little cornstarch for crisping." },
            new() { RecipeId = recipes[20].Id, Description = "Heat oil in a pan and fry tofu until golden and crispy on all sides; set aside on paper towels." },
            new() { RecipeId = recipes[20].Id, Description = "In a wok, sauté green curry paste with a splash of oil until aromatic, add sliced shallots, garlic and thinly sliced peppers." },
            new() { RecipeId = recipes[20].Id, Description = "Pour in coconut milk, add a handful of kaffir lime leaves and a spoonful of palm sugar, bringing the sauce to a gentle simmer." },
            new() { RecipeId = recipes[20].Id, Description = "Add bamboo shoots, green beans and the fried tofu, simmering until vegetables are tender but still vibrant." },
            new() { RecipeId = recipes[20].Id, Description = "Finish with a squeeze of lime juice, chopped basil and coriander, and adjust seasoning with fish sauce or soy for saltiness." },
            new() { RecipeId = recipes[20].Id, Description = "Serve the curry over steamed jasmine rice and garnish with extra Thai basil leaves and sliced chili if desired." },
            new() { RecipeId = recipes[20].Id, Description = "Offer lime wedges and extra chili on the side so diners can customize heat and acidity." },

            //  Maple-Glazed Pork Tenderloin
            new() { RecipeId = recipes[21].Id, Description = "Preheat oven to 400°F (200°C) and season the pork tenderloin with salt, pepper and a light dusting of smoked paprika." },
            new() { RecipeId = recipes[21].Id, Description = "Sear the pork in a hot ovenproof skillet with a splash of oil until browned on all sides." },
            new() { RecipeId = recipes[21].Id, Description = "In a small saucepan, combine maple syrup, Dijon mustard, minced garlic and a splash of soy sauce; simmer briefly to thicken." },
            new() { RecipeId = recipes[21].Id, Description = "Brush the maple glaze over the seared pork and transfer the skillet to the oven to roast for 12–18 minutes until the internal temperature reaches 145°F (63°C)." },
            new() { RecipeId = recipes[21].Id, Description = "Remove pork and let rest 10 minutes before slicing to keep it juicy." },
            new() { RecipeId = recipes[21].Id, Description = "While pork rests, toss roasted root vegetables with remaining glaze and finish in the oven for a few minutes if needed." },
            new() { RecipeId = recipes[21].Id, Description = "Slice the tenderloin into medallions and arrange on a platter with the glazed vegetables." },
            new() { RecipeId = recipes[21].Id, Description = "Drizzle any pan juices over the sliced pork and garnish with chopped parsley." },

            //  Smoky Black Bean Burgers
            new() { RecipeId = recipes[22].Id, Description = "Drain and rinse black beans, then mash most of them in a bowl leaving some texture for bite." },
            new() { RecipeId = recipes[22].Id, Description = "Add finely chopped onion, minced garlic, smoked paprika, cumin, chopped cilantro and a binder such as oats or breadcrumbs; season with salt and pepper." },
            new() { RecipeId = recipes[22].Id, Description = "Mix until combined, then form into evenly sized patties and chill for 15 minutes to firm up." },
            new() { RecipeId = recipes[22].Id, Description = "Heat a skillet with oil and cook the patties 3–4 minutes per side until a crust forms and they are heated through." },
            new() { RecipeId = recipes[22].Id, Description = "Toast the burger buns and prepare toppings like sliced avocado, tomato, lettuce and a smoky chipotle mayo." },
            new() { RecipeId = recipes[22].Id, Description = "Assemble the burgers and press gently so the flavors meld together." },
            new() { RecipeId = recipes[22].Id, Description = "Serve with oven-baked fries or a crisp slaw and offer lime wedges for a fresh squeeze." },
            new() { RecipeId = recipes[22].Id, Description = "If desired, finish with a sprinkle of crumbled cheese or fresh herbs to elevate the flavor." },

            //  Orange Cardamom Panna Cotta
            new() { RecipeId = recipes[23].Id, Description = "Soak gelatin sheets or bloom powdered gelatin in cold water according to package directions." },
            new() { RecipeId = recipes[23].Id, Description = "Heat cream, milk, sugar, orange zest and crushed cardamom pods gently until the sugar dissolves and mixture is fragrant; do not boil." },
            new() { RecipeId = recipes[23].Id, Description = "Squeeze out excess water from gelatin and whisk it into the warm cream until fully dissolved." },
            new() { RecipeId = recipes[23].Id, Description = "Strain the mixture to remove cardamom husks and pour into ramekins or serving glasses." },
            new() { RecipeId = recipes[23].Id, Description = "Chill for at least 4 hours or overnight until set and silky." },
            new() { RecipeId = recipes[23].Id, Description = "Prepare a citrus compote by simmering orange segments with a touch of sugar and a splash of Grand Marnier or lemon juice." },
            new() { RecipeId = recipes[23].Id, Description = "Top each panna cotta with a spoonful of compote and some candied orange zest before serving." },
            new() { RecipeId = recipes[23].Id, Description = "Serve chilled with short, elegant spoons and a small mint leaf for garnish." },

            //  Charred Vegetable and Halloumi Skewers
            new() { RecipeId = recipes[24].Id, Description = "Chop bell peppers, zucchini, red onion and mushrooms into uniform pieces for even cooking." },
            new() { RecipeId = recipes[24].Id, Description = "Cut halloumi into thick cubes and thread vegetables and halloumi alternately onto skewers." },
            new() { RecipeId = recipes[24].Id, Description = "Brush skewers with olive oil and season with salt, pepper and a pinch of smoked paprika." },
            new() { RecipeId = recipes[24].Id, Description = "Char on a very hot grill or under a broiler, turning frequently until vegetables blister and halloumi gets golden edges." },
            new() { RecipeId = recipes[24].Id, Description = "Whisk lemon juice, chopped parsley, garlic and a little olive oil to make a bright dressing." },
            new() { RecipeId = recipes[24].Id, Description = "Drizzle the skewers with the lemon-herb dressing and scatter toasted pine nuts for crunch." },
            new() { RecipeId = recipes[24].Id, Description = "Serve immediately while the halloumi is warm and slightly squeaky." },
            new() { RecipeId = recipes[24].Id, Description = "Offer crusty bread and a simple tomato salad on the side for a complete meal." },

            //  Butternut Squash Risotto
            new() { RecipeId = recipes[25].Id, Description = "Peel and dice butternut squash, toss with oil, salt and pepper, and roast at 400°F (200°C) until caramelized." },
            new() { RecipeId = recipes[25].Id, Description = "Warm chicken or vegetable stock in a saucepan and keep it at a gentle simmer." },
            new() { RecipeId = recipes[25].Id, Description = "In a wide, heavy pan, sauté finely chopped onion in butter until translucent, then add arborio rice and toast for 1–2 minutes." },
            new() { RecipeId = recipes[25].Id, Description = "Ladle in hot stock one cup at a time, stirring frequently and allowing the rice to absorb the liquid before adding more." },
            new() { RecipeId = recipes[25].Id, Description = "When rice is creamy and al dente, stir in roasted butternut squash, grated parmesan and a knob of butter for richness." },
            new() { RecipeId = recipes[25].Id, Description = "Season with salt, pepper and a pinch of nutmeg; adjust consistency with additional stock if needed." },
            new() { RecipeId = recipes[25].Id, Description = "Let the risotto rest for a minute, then serve hot with extra parmesan and chopped sage." },
            new() { RecipeId = recipes[25].Id, Description = "Pair with a crisp white wine for a comforting autumn meal." },

            //  Cinnamon Apple Overnight Oats
            new() { RecipeId = recipes[26].Id, Description = "Grate or finely chop a tart apple and place it in a jar with rolled oats and chia seeds." },
            new() { RecipeId = recipes[26].Id, Description = "Pour in milk of choice and a generous pinch of ground cinnamon, stir in a drizzle of maple syrup and vanilla extract." },
            new() { RecipeId = recipes[26].Id, Description = "Stir well, seal the jar and refrigerate overnight so the oats soften and apples release flavor." },
            new() { RecipeId = recipes[26].Id, Description = "In the morning, give the oats a good stir and add a splash more milk if needed to reach desired consistency." },
            new() { RecipeId = recipes[26].Id, Description = "Top with toasted nuts, extra apple slices and a sprinkle of cinnamon for texture and freshness." },
            new() { RecipeId = recipes[26].Id, Description = "If you prefer warm oats, microwave for 60–90 seconds before adding toppings." },
            new() { RecipeId = recipes[26].Id, Description = "Pack in a lunchbox for a ready-to-eat healthy breakfast on the go." },
            new() { RecipeId = recipes[26].Id, Description = "Adjust sweetness to taste; add Greek yogurt for extra creaminess and protein." },

            //  Moroccan Chickpea Stew
            new() { RecipeId = recipes[27].Id, Description = "Heat oil and sauté chopped onion until soft, then add minced garlic, grated ginger and a blend of cumin, coriander and cinnamon." },
            new() { RecipeId = recipes[27].Id, Description = "Stir in diced tomatoes, drained chickpeas, chopped carrots and diced sweet potato, coating them in the spice mixture." },
            new() { RecipeId = recipes[27].Id, Description = "Add vegetable stock, a handful of chopped dried apricots and harissa or chili to taste; bring to a simmer." },
            new() { RecipeId = recipes[27].Id, Description = "Cover and cook gently for 30–40 minutes until vegetables are tender and the stew has thickened." },
            new() { RecipeId = recipes[27].Id, Description = "Stir in chopped cilantro and a squeeze of lemon juice to brighten the flavors." },
            new() { RecipeId = recipes[27].Id, Description = "Serve over couscous or with warm flatbread for soaking up the sauce." },
            new() { RecipeId = recipes[27].Id, Description = "Garnish with toasted almonds or pistachios for crunch and extra aroma." },
            new() { RecipeId = recipes[27].Id, Description = "Leftovers develop even more flavor — reheat gently and add a splash of stock if needed." },

            //  Seared Scallops with Pea Purée
            new() { RecipeId = recipes[28].Id, Description = "Bring a pot of salted water to a boil and blanch fresh or frozen peas for 1–2 minutes; drain and shock in ice water to keep color." },
            new() { RecipeId = recipes[28].Id, Description = "Blend the peas with a splash of cream, lemon juice and a handful of mint until smooth; season to taste." },
            new() { RecipeId = recipes[28].Id, Description = "Pat scallops very dry with paper towels and season lightly with salt and pepper." },
            new() { RecipeId = recipes[28].Id, Description = "Heat a heavy pan until smoking hot, add a little oil and sear scallops quickly 1–2 minutes per side until a golden crust forms." },
            new() { RecipeId = recipes[28].Id, Description = "Finish scallops with a knob of butter and a squeeze of lemon in the pan, spooning the foam over them." },
            new() { RecipeId = recipes[28].Id, Description = "Spread a generous spoonful of pea purée on warm plates and place scallops on top." },
            new() { RecipeId = recipes[28].Id, Description = "Garnish with microgreens or chopped mint and serve immediately." },
            new() { RecipeId = recipes[28].Id, Description = "Pair with a chilled glass of dry white wine for an elegant starter." },

            //  Roasted Beet and Goat Cheese Salad
            new() { RecipeId = recipes[29].Id, Description = "Preheat oven to 400°F (200°C). Wrap whole beets in foil and roast until tender, about 45–60 minutes depending on size." },
            new() { RecipeId = recipes[29].Id, Description = "When cool enough, peel beets and slice into wedges; toss with a little olive oil, salt and pepper." },
            new() { RecipeId = recipes[29].Id, Description = "Arrange arugula or mixed greens on a platter and scatter the roasted beets on top." },
            new() { RecipeId = recipes[29].Id, Description = "Crumble soft goat cheese over the salad and add toasted walnuts for crunch." },
            new() { RecipeId = recipes[29].Id, Description = "Whisk together balsamic vinegar, olive oil, a touch of honey and Dijon mustard for the dressing." },
            new() { RecipeId = recipes[29].Id, Description = "Drizzle dressing over the salad, toss gently and finish with a grind of black pepper." },
            new() { RecipeId = recipes[29].Id, Description = "Serve as a starter or light main; complements roast chicken or pork well." },
            new() { RecipeId = recipes[29].Id, Description = "Leftovers keep well in the fridge for a day but add dressing just before serving to keep greens crisp." },

            //  Spicy Korean Beef Bowls
            new() { RecipeId = recipes[30].Id, Description = "Thinly slice beef against the grain and marinate briefly with soy sauce, brown sugar, sesame oil and garlic." },
            new() { RecipeId = recipes[30].Id, Description = "Heat a skillet on high and stir-fry the beef quickly until caramelized; remove and set aside." },
            new() { RecipeId = recipes[30].Id, Description = "In the same pan, sauté shredded carrot, sliced scallions and matchstick cucumber for crunch." },
            new() { RecipeId = recipes[30].Id, Description = "Mix gochujang with a splash of rice vinegar, sesame oil and a little honey to create a glossy sauce." },
            new() { RecipeId = recipes[30].Id, Description = "Toss the beef back in with the sauce to coat and heat through for a minute." },
            new() { RecipeId = recipes[30].Id, Description = "Serve over bowls of steamed rice, add kimchi on the side and sprinkle with toasted sesame seeds." },
            new() { RecipeId = recipes[30].Id, Description = "Top with a soft-cooked egg if desired for extra richness." },
            new() { RecipeId = recipes[30].Id, Description = "Offer lime wedges and extra gochujang for diners who want more brightness or heat." },

            //  Lentil and Sweet Potato Shepherd's Pie
            new() { RecipeId = recipes[31].Id, Description = "Peel and dice sweet potatoes, boil until tender and mash with a little butter and milk until smooth." },
            new() { RecipeId = recipes[31].Id, Description = "Sauté onion, carrot and celery until soft, then add garlic and cooked green or brown lentils." },
            new() { RecipeId = recipes[31].Id, Description = "Stir in tomato paste, vegetable stock and Worcestershire or soy sauce for depth, simmer until thick." },
            new() { RecipeId = recipes[31].Id, Description = "Season the lentil mixture with thyme and rosemary and transfer to a baking dish." },
            new() { RecipeId = recipes[31].Id, Description = "Spread the sweet potato mash evenly over the filling and rough up the surface with a fork for texture." },
            new() { RecipeId = recipes[31].Id, Description = "Brush the top with a little melted butter and bake at 400°F (200°C) until the edges bubble and the top is golden." },
            new() { RecipeId = recipes[31].Id, Description = "Let cool for 10 minutes so the filling sets slightly, then slice and serve." },
            new() { RecipeId = recipes[31].Id, Description = "Garnish with chopped parsley and accompany with steamed greens or a simple salad." },

            //  Caramelized Onion and Gruyere Tart
            new() { RecipeId = recipes[32].Id, Description = "Slice onions thinly and slowly caramelize in butter over low heat until deeply golden and sweet, about 30–40 minutes." },
            new() { RecipeId = recipes[32].Id, Description = "Roll out puff pastry and fit into a tart tin, trimming excess dough." },
            new() { RecipeId = recipes[32].Id, Description = "Spread a thin layer of Dijon mustard over the base, then scatter the caramelized onions evenly." },
            new() { RecipeId = recipes[32].Id, Description = "Top with grated gruyere and a sprinkle of thyme leaves for an aromatic lift." },
            new() { RecipeId = recipes[32].Id, Description = "Bake at 375°F (190°C) until the pastry is golden and the cheese has melted." },
            new() { RecipeId = recipes[32].Id, Description = "Allow to cool slightly before slicing so the tart holds its shape." },
            new() { RecipeId = recipes[32].Id, Description = "Serve warm with a peppery rocket salad and a light vinaigrette." },
            new() { RecipeId = recipes[32].Id, Description = "Leftover tart reheats well in a low oven to refresh the pastry." },

            //  Coconut Mango Chia Pudding
            new() { RecipeId = recipes[33].Id, Description = "In a jar, combine chia seeds, coconut milk, a drizzle of honey or maple syrup and a splash of vanilla; stir well to break up clumps." },
            new() { RecipeId = recipes[33].Id, Description = "Refrigerate for at least 4 hours or overnight, stirring after 30 minutes once to prevent seeds clumping." },
            new() { RecipeId = recipes[33].Id, Description = "Prepare fresh mango by peeling, dicing and tossing with a squeeze of lime juice." },
            new() { RecipeId = recipes[33].Id, Description = "When chia pudding is set and creamy, layer with mango in serving glasses." },
            new() { RecipeId = recipes[33].Id, Description = "Top with toasted coconut flakes and a few chopped pistachios for texture." },
            new() { RecipeId = recipes[33].Id, Description = "Serve chilled as a light breakfast or healthy dessert." },
            new() { RecipeId = recipes[33].Id, Description = "For extra richness stir in a spoonful of Greek yogurt before layering." },
            new() { RecipeId = recipes[33].Id, Description = "Adjust sweetness to taste and add a pinch of ground cardamom for a fragrant twist." },

        };

        var orderedSteps = steps
            .GroupBy(s => s.RecipeId)
            .SelectMany(g => g.Select((step, index) =>
            {
                step.Order = index + 1;
                return step;
            }))
            .ToList();

        context.Steps.AddRange(orderedSteps);


        var ingredients = new List<Ingredient>
        {
            // Spaghetti Carbonara
            new() { RecipeId = recipes[0].Id, Name = "Spaghetti", Quantity = 400, UnitId = units[0].Id },
            new() { RecipeId = recipes[0].Id, Name = "Pancetta", Quantity = 150, UnitId = units[0].Id },
            new() { RecipeId = recipes[0].Id, Name = "Eggs", Quantity = 4, UnitId = units[2].Id },
            new() { RecipeId = recipes[0].Id, Name = "Pecorino Cheese", Quantity = 100, UnitId = units[0].Id },
            new() { RecipeId = recipes[0].Id, Name = "Black Pepper", Quantity = 1, UnitId = units[11].Id },
            new() { RecipeId = recipes[0].Id, Name = "Salt", Quantity = 1, UnitId = units[11].Id },

            // Avocado Toast Deluxe
            new() { RecipeId = recipes[1].Id, Name = "Bread Slices", Quantity = 2, UnitId = units[10].Id },
            new() { RecipeId = recipes[1].Id, Name = "Avocado", Quantity = 1, UnitId = units[2].Id },
            new() { RecipeId = recipes[1].Id, Name = "Eggs", Quantity = 2, UnitId = units[2].Id },
            new() { RecipeId = recipes[1].Id, Name = "Chili Flakes", Quantity = 1, UnitId = units[5].Id },
            new() { RecipeId = recipes[1].Id, Name = "Olive Oil", Quantity = 1, UnitId = units[6].Id },

            // Garlic Butter Shrimp Pasta
            new() { RecipeId = recipes[2].Id, Name = "Shrimp", Quantity = 300, UnitId = units[0].Id },
            new() { RecipeId = recipes[2].Id, Name = "Linguine Pasta", Quantity = 200, UnitId = units[0].Id },
            new() { RecipeId = recipes[2].Id, Name = "Butter", Quantity = 50, UnitId = units[0].Id },
            new() { RecipeId = recipes[2].Id, Name = "Garlic Cloves", Quantity = 3, UnitId = units[2].Id },
            new() { RecipeId = recipes[2].Id, Name = "Parsley", Quantity = 5, UnitId = units[2].Id },
            new() { RecipeId = recipes[2].Id, Name = "Lemon Juice", Quantity = 1, UnitId = units[6].Id },

            // Classic Pancakes
            new() { RecipeId = recipes[3].Id, Name = "Flour", Quantity = 200, UnitId = units[0].Id },
            new() { RecipeId = recipes[3].Id, Name = "Eggs", Quantity = 2, UnitId = units[2].Id },
            new() { RecipeId = recipes[3].Id, Name = "Milk", Quantity = 300, UnitId = units[3].Id },
            new() { RecipeId = recipes[3].Id, Name = "Sugar", Quantity = 50, UnitId = units[0].Id },
            new() { RecipeId = recipes[3].Id, Name = "Baking Powder", Quantity = 10, UnitId = units[0].Id },
            new() { RecipeId = recipes[3].Id, Name = "Salt", Quantity = 1, UnitId = units[11].Id },
            new() { RecipeId = recipes[3].Id, Name = "Butter", Quantity = 20, UnitId = units[0].Id },

            // Cauliflower Curry
            new() { RecipeId = recipes[4].Id, Name = "Cauliflower", Quantity = 1, UnitId = units[2].Id },
            new() { RecipeId = recipes[4].Id, Name = "Onion", Quantity = 1, UnitId = units[2].Id },
            new() { RecipeId = recipes[4].Id, Name = "Coconut Milk", Quantity = 400, UnitId = units[3].Id },
            new() { RecipeId = recipes[4].Id, Name = "Curry Powder", Quantity = 2, UnitId = units[6].Id },
            new() { RecipeId = recipes[4].Id, Name = "Garlic Cloves", Quantity = 3, UnitId = units[2].Id },
            new() { RecipeId = recipes[4].Id, Name = "Ginger", Quantity = 1, UnitId = units[2].Id },

            // ----- USER 1 -----
            // Chicken Tikka Masala
            new() { RecipeId = recipes[5].Id, Name = "Chicken Thighs", Quantity = 500, UnitId = units[0].Id },
            new() { RecipeId = recipes[5].Id, Name = "Yogurt", Quantity = 200, UnitId = units[3].Id },
            new() { RecipeId = recipes[5].Id, Name = "Tomato Puree", Quantity = 250, UnitId = units[3].Id },
            new() { RecipeId = recipes[5].Id, Name = "Garlic Cloves", Quantity = 3, UnitId = units[2].Id },
            new() { RecipeId = recipes[5].Id, Name = "Ginger", Quantity = 1, UnitId = units[2].Id },
            new() { RecipeId = recipes[5].Id, Name = "Spices Mix", Quantity = 2, UnitId = units[6].Id },

            // Grilled Chicken Salad
            new() { RecipeId = recipes[6].Id, Name = "Chicken Breast", Quantity = 200, UnitId = units[0].Id },
            new() { RecipeId = recipes[6].Id, Name = "Lettuce", Quantity = 1, UnitId = units[2].Id },
            new() { RecipeId = recipes[6].Id, Name = "Olive Oil", Quantity = 2, UnitId = units[6].Id },
            new() { RecipeId = recipes[6].Id, Name = "Lemon Juice", Quantity = 1, UnitId = units[6].Id },
            new() { RecipeId = recipes[6].Id, Name = "Cherry Tomatoes", Quantity = 100, UnitId = units[0].Id },

            // Baked Salmon with Lemon
            new() { RecipeId = recipes[7].Id, Name = "Salmon Fillet", Quantity = 2, UnitId = units[2].Id },
            new() { RecipeId = recipes[7].Id, Name = "Olive Oil", Quantity = 1, UnitId = units[6].Id },
            new() { RecipeId = recipes[7].Id, Name = "Lemon Juice", Quantity = 1, UnitId = units[6].Id },
            new() { RecipeId = recipes[7].Id, Name = "Fresh Dill", Quantity = 5, UnitId = units[2].Id },

            // Banana Smoothie
            new() { RecipeId = recipes[8].Id, Name = "Banana", Quantity = 1, UnitId = units[2].Id },
            new() { RecipeId = recipes[8].Id, Name = "Milk", Quantity = 250, UnitId = units[3].Id },
            new() { RecipeId = recipes[8].Id, Name = "Honey", Quantity = 1, UnitId = units[6].Id },

            // Beef Stroganoff
            new() { RecipeId = recipes[9].Id, Name = "Beef", Quantity = 400, UnitId = units[0].Id },
            new() { RecipeId = recipes[9].Id, Name = "Mushrooms", Quantity = 200, UnitId = units[0].Id },
            new() { RecipeId = recipes[9].Id, Name = "Sour Cream", Quantity = 150, UnitId = units[3].Id },
            new() { RecipeId = recipes[9].Id, Name = "Onion", Quantity = 1, UnitId = units[2].Id },
            new() { RecipeId = recipes[9].Id, Name = "Butter", Quantity = 20, UnitId = units[0].Id },
            new() { RecipeId = recipes[9].Id, Name = "Flour", Quantity = 10, UnitId = units[0].Id },

            // ----- USER 2 -----
            // Vegan Chili
            new() { RecipeId = recipes[10].Id, Name = "Canned Beans", Quantity = 400, UnitId = units[3].Id },
            new() { RecipeId = recipes[10].Id, Name = "Bell Peppers", Quantity = 2, UnitId = units[2].Id },
            new() { RecipeId = recipes[10].Id, Name = "Onion", Quantity = 1, UnitId = units[2].Id },
            new() { RecipeId = recipes[10].Id, Name = "Tomatoes", Quantity = 300, UnitId = units[0].Id },
            new() { RecipeId = recipes[10].Id, Name = "Chili Powder", Quantity = 2, UnitId = units[6].Id },

            // Tomato Basil Soup
            new() { RecipeId = recipes[11].Id, Name = "Tomatoes", Quantity = 400, UnitId = units[0].Id },
            new() { RecipeId = recipes[11].Id, Name = "Onion", Quantity = 1, UnitId = units[2].Id },
            new() { RecipeId = recipes[11].Id, Name = "Cream", Quantity = 200, UnitId = units[3].Id },
            new() { RecipeId = recipes[11].Id, Name = "Fresh Basil", Quantity = 10, UnitId = units[2].Id },

            // Chocolate Mug Cake
            new() { RecipeId = recipes[12].Id, Name = "Flour", Quantity = 4, UnitId = units[7].Id },
            new() { RecipeId = recipes[12].Id, Name = "Cocoa Powder", Quantity = 2, UnitId = units[6].Id },
            new() { RecipeId = recipes[12].Id, Name = "Egg", Quantity = 1, UnitId = units[2].Id },
            new() { RecipeId = recipes[12].Id, Name = "Milk", Quantity = 3, UnitId = units[6].Id },
            new() { RecipeId = recipes[12].Id, Name = "Sugar", Quantity = 2, UnitId = units[6].Id },

            // Vegan Buddha Bowl
            new() { RecipeId = recipes[13].Id, Name = "Quinoa", Quantity = 100, UnitId = units[0].Id },
            new() { RecipeId = recipes[13].Id, Name = "Chickpeas", Quantity = 200, UnitId = units[0].Id },
            new() { RecipeId = recipes[13].Id, Name = "Roasted Vegetables", Quantity = 150, UnitId = units[0].Id },
            new() { RecipeId = recipes[13].Id, Name = "Tahini", Quantity = 2, UnitId = units[6].Id },
            new() { RecipeId = recipes[13].Id, Name = "Lemon Juice", Quantity = 1, UnitId = units[6].Id },
            new() { RecipeId = recipes[13].Id, Name = "Olive Oil", Quantity = 1, UnitId = units[6].Id },

            // Mushroom Risotto
            new() { RecipeId = recipes[14].Id, Name = "Arborio Rice", Quantity = 200, UnitId = units[0].Id },
            new() { RecipeId = recipes[14].Id, Name = "Mushrooms", Quantity = 150, UnitId = units[0].Id },
            new() { RecipeId = recipes[14].Id, Name = "Parmesan Cheese", Quantity = 50, UnitId = units[0].Id },
            new() { RecipeId = recipes[14].Id, Name = "Onion", Quantity = 1, UnitId = units[2].Id },
            new() { RecipeId = recipes[14].Id, Name = "Vegetable Broth", Quantity = 500, UnitId = units[3].Id },
            new() { RecipeId = recipes[14].Id, Name = "Butter", Quantity = 20, UnitId = units[0].Id },

            // Lemon Herb Roasted Chicken
            new() { RecipeId = recipes[15].Id, Name = "Whole Chicken", Quantity = 1, UnitId = units[2].Id },
            new() { RecipeId = recipes[15].Id, Name = "Lemon", Quantity = 1, UnitId = units[2].Id },
            new() { RecipeId = recipes[15].Id, Name = "Garlic Cloves", Quantity = 4, UnitId = units[2].Id },
            new() { RecipeId = recipes[15].Id, Name = "Fresh Herbs", Quantity = 10, UnitId = units[2].Id },
            new() { RecipeId = recipes[15].Id, Name = "Olive Oil", Quantity = 2, UnitId = units[6].Id },
            new() { RecipeId = recipes[15].Id, Name = "Salt", Quantity = 1, UnitId = units[11].Id },
            new() { RecipeId = recipes[15].Id, Name = "Black Pepper", Quantity = 1, UnitId = units[11].Id },

            // Spicy Korean Beef Bowls
            new() { RecipeId = recipes[16].Id, Name = "Beef Strips", Quantity = 400, UnitId = units[0].Id },
            new() { RecipeId = recipes[16].Id, Name = "Gochujang Sauce", Quantity = 3, UnitId = units[6].Id },
            new() { RecipeId = recipes[16].Id, Name = "Rice", Quantity = 200, UnitId = units[0].Id },
            new() { RecipeId = recipes[16].Id, Name = "Cucumber", Quantity = 1, UnitId = units[2].Id },
            new() { RecipeId = recipes[16].Id, Name = "Kimchi", Quantity = 100, UnitId = units[0].Id },
            new() { RecipeId = recipes[16].Id, Name = "Sesame Oil", Quantity = 1, UnitId = units[6].Id },

            // ----- USER 1 continued -----
            // Szechuan Stir-Fry Noodles
            new() { RecipeId = recipes[17].Id, Name = "Noodles", Quantity = 200, UnitId = units[0].Id },
            new() { RecipeId = recipes[17].Id, Name = "Bell Peppers", Quantity = 2, UnitId = units[2].Id },
            new() { RecipeId = recipes[17].Id, Name = "Carrot", Quantity = 1, UnitId = units[2].Id },
            new() { RecipeId = recipes[17].Id, Name = "Szechuan Sauce", Quantity = 3, UnitId = units[6].Id },
            new() { RecipeId = recipes[17].Id, Name = "Soy Sauce", Quantity = 2, UnitId = units[6].Id },
            new() { RecipeId = recipes[17].Id, Name = "Garlic Cloves", Quantity = 2, UnitId = units[2].Id },
            new() { RecipeId = recipes[17].Id, Name = "Ginger", Quantity = 1, UnitId = units[2].Id },

            // Maple-Glazed Pork Tenderloin
            new() { RecipeId = recipes[18].Id, Name = "Pork Tenderloin", Quantity = 500, UnitId = units[0].Id },
            new() { RecipeId = recipes[18].Id, Name = "Maple Syrup", Quantity = 3, UnitId = units[6].Id },
            new() { RecipeId = recipes[18].Id, Name = "Garlic Cloves", Quantity = 3, UnitId = units[2].Id },
            new() { RecipeId = recipes[18].Id, Name = "Olive Oil", Quantity = 2, UnitId = units[6].Id },
            new() { RecipeId = recipes[18].Id, Name = "Carrots", Quantity = 2, UnitId = units[2].Id },
            new() { RecipeId = recipes[18].Id, Name = "Parsnips", Quantity = 2, UnitId = units[2].Id },

            // Cinnamon Apple Overnight Oats
            new() { RecipeId = recipes[19].Id, Name = "Rolled Oats", Quantity = 100, UnitId = units[0].Id },
            new() { RecipeId = recipes[19].Id, Name = "Apple", Quantity = 1, UnitId = units[2].Id },
            new() { RecipeId = recipes[19].Id, Name = "Cinnamon", Quantity = 1, UnitId = units[5].Id },
            new() { RecipeId = recipes[19].Id, Name = "Maple Syrup", Quantity = 1, UnitId = units[6].Id },
            new() { RecipeId = recipes[19].Id, Name = "Milk", Quantity = 200, UnitId = units[3].Id },

            // ----- USER 2 continued -----
            // Moroccan Chickpea Stew
            new() { RecipeId = recipes[20].Id, Name = "Chickpeas", Quantity = 400, UnitId = units[3].Id },
            new() { RecipeId = recipes[20].Id, Name = "Tomatoes", Quantity = 300, UnitId = units[0].Id },
            new() { RecipeId = recipes[20].Id, Name = "Dried Apricots", Quantity = 50, UnitId = units[0].Id },
            new() { RecipeId = recipes[20].Id, Name = "Onion", Quantity = 1, UnitId = units[2].Id },
            new() { RecipeId = recipes[20].Id, Name = "Cumin", Quantity = 1, UnitId = units[5].Id },
            new() { RecipeId = recipes[20].Id, Name = "Cinnamon", Quantity = 1, UnitId = units[5].Id },

            // Seared Scallops with Pea Purée
            new() { RecipeId = recipes[21].Id, Name = "Scallops", Quantity = 200, UnitId = units[0].Id },
            new() { RecipeId = recipes[21].Id, Name = "Peas", Quantity = 150, UnitId = units[0].Id },
            new() { RecipeId = recipes[21].Id, Name = "Lemon Juice", Quantity = 1, UnitId = units[6].Id },
            new() { RecipeId = recipes[21].Id, Name = "Mint Leaves", Quantity = 5, UnitId = units[2].Id },
            new() { RecipeId = recipes[21].Id, Name = "Butter", Quantity = 20, UnitId = units[0].Id },

            // Roasted Beet and Goat Cheese Salad
            new() { RecipeId = recipes[22].Id, Name = "Beets", Quantity = 3, UnitId = units[2].Id },
            new() { RecipeId = recipes[22].Id, Name = "Goat Cheese", Quantity = 50, UnitId = units[0].Id },
            new() { RecipeId = recipes[22].Id, Name = "Arugula", Quantity = 50, UnitId = units[0].Id },
            new() { RecipeId = recipes[22].Id, Name = "Balsamic Glaze", Quantity = 2, UnitId = units[6].Id },
            new() { RecipeId = recipes[22].Id, Name = "Olive Oil", Quantity = 1, UnitId = units[6].Id },

            // Smoky Black Bean Burgers
            new() { RecipeId = recipes[23].Id, Name = "Black Beans", Quantity = 400, UnitId = units[3].Id },
            new() { RecipeId = recipes[23].Id, Name = "Smoked Paprika", Quantity = 1, UnitId = units[5].Id },
            new() { RecipeId = recipes[23].Id, Name = "Oats", Quantity = 50, UnitId = units[0].Id },
            new() { RecipeId = recipes[23].Id, Name = "Buns", Quantity = 4, UnitId = units[10].Id },
            new() { RecipeId = recipes[23].Id, Name = "Onion", Quantity = 1, UnitId = units[2].Id },
            new() { RecipeId = recipes[23].Id, Name = "Garlic Cloves", Quantity = 2, UnitId = units[2].Id },

            // ----- Recipe 24: Cinnamon Apple Overnight Oats -----
            new() { RecipeId = recipes[23].Id, Name = "Rolled Oats", Quantity = 100, UnitId = units[0].Id }, // g
            new() { RecipeId = recipes[23].Id, Name = "Milk", Quantity = 150, UnitId = units[3].Id },        // ml
            new() { RecipeId = recipes[23].Id, Name = "Apple", Quantity = 1, UnitId = units[2].Id },         // pcs
            new() { RecipeId = recipes[23].Id, Name = "Cinnamon", Quantity = 1, UnitId = units[6].Id },     // tbsp
            new() { RecipeId = recipes[23].Id, Name = "Maple Syrup", Quantity = 2, UnitId = units[6].Id },  // tbsp
            new() { RecipeId = recipes[23].Id, Name = "Chia Seeds", Quantity = 1, UnitId = units[6].Id },   // tbsp
            new() { RecipeId = recipes[23].Id, Name = "Vanilla Extract", Quantity = 1, UnitId = units[5].Id }, // tsp
            new() { RecipeId = recipes[23].Id, Name = "Salt", Quantity = 1, UnitId = units[5].Id },          // tsp

            // ----- Recipe 25: Moroccan Chickpea Stew -----
            new() { RecipeId = recipes[24].Id, Name = "Chickpeas", Quantity = 400, UnitId = units[0].Id },  // g
            new() { RecipeId = recipes[24].Id, Name = "Tomatoes", Quantity = 300, UnitId = units[0].Id },   // g
            new() { RecipeId = recipes[24].Id, Name = "Carrots", Quantity = 2, UnitId = units[2].Id },      // pcs
            new() { RecipeId = recipes[24].Id, Name = "Onion", Quantity = 1, UnitId = units[2].Id },        // pcs
            new() { RecipeId = recipes[24].Id, Name = "Cumin Powder", Quantity = 1, UnitId = units[6].Id }, // tbsp
            new() { RecipeId = recipes[24].Id, Name = "Cinnamon Stick", Quantity = 1, UnitId = units[2].Id }, // pcs
            new() { RecipeId = recipes[24].Id, Name = "Olive Oil", Quantity = 2, UnitId = units[6].Id },    // tbsp
            new() { RecipeId = recipes[24].Id, Name = "Salt", Quantity = 1, UnitId = units[6].Id },          // tbsp

            // ----- Recipe 26: Seared Scallops with Pea Purée -----
            new() { RecipeId = recipes[25].Id, Name = "Scallops", Quantity = 300, UnitId = units[0].Id },   // g
            new() { RecipeId = recipes[25].Id, Name = "Peas", Quantity = 150, UnitId = units[0].Id },       // g
            new() { RecipeId = recipes[25].Id, Name = "Butter", Quantity = 50, UnitId = units[0].Id },      // g
            new() { RecipeId = recipes[25].Id, Name = "Lemon Juice", Quantity = 1, UnitId = units[6].Id },  // tbsp
            new() { RecipeId = recipes[25].Id, Name = "Mint Leaves", Quantity = 5, UnitId = units[0].Id },  // g
            new() { RecipeId = recipes[25].Id, Name = "Salt", Quantity = 1, UnitId = units[6].Id },         // tbsp
            new() { RecipeId = recipes[25].Id, Name = "Black Pepper", Quantity = 1, UnitId = units[6].Id }, // tbsp
            new() { RecipeId = recipes[25].Id, Name = "Olive Oil", Quantity = 1, UnitId = units[6].Id },    // tbsp

            // ----- Recipe 27: Roasted Beet and Goat Cheese Salad -----
            new() { RecipeId = recipes[26].Id, Name = "Beets", Quantity = 3, UnitId = units[2].Id },        // pcs
            new() { RecipeId = recipes[26].Id, Name = "Goat Cheese", Quantity = 100, UnitId = units[0].Id },// g
            new() { RecipeId = recipes[26].Id, Name = "Arugula", Quantity = 50, UnitId = units[0].Id },    // g
            new() { RecipeId = recipes[26].Id, Name = "Olive Oil", Quantity = 2, UnitId = units[6].Id },   // tbsp
            new() { RecipeId = recipes[26].Id, Name = "Balsamic Glaze", Quantity = 2, UnitId = units[6].Id }, // tbsp
            new() { RecipeId = recipes[26].Id, Name = "Salt", Quantity = 1, UnitId = units[6].Id },        // tbsp
            new() { RecipeId = recipes[26].Id, Name = "Black Pepper", Quantity = 1, UnitId = units[6].Id },// tbsp
            new() { RecipeId = recipes[26].Id, Name = "Walnuts", Quantity = 30, UnitId = units[0].Id },    // g

            // ----- Recipe 28: Spicy Korean Beef Bowls -----
            new() { RecipeId = recipes[27].Id, Name = "Beef", Quantity = 300, UnitId = units[0].Id },       // g
            new() { RecipeId = recipes[27].Id, Name = "Gochujang Sauce", Quantity = 3, UnitId = units[6].Id }, // tbsp
            new() { RecipeId = recipes[27].Id, Name = "Rice", Quantity = 200, UnitId = units[0].Id },      // g
            new() { RecipeId = recipes[27].Id, Name = "Cucumber", Quantity = 1, UnitId = units[2].Id },    // pcs
            new() { RecipeId = recipes[27].Id, Name = "Carrots", Quantity = 1, UnitId = units[2].Id },     // pcs
            new() { RecipeId = recipes[27].Id, Name = "Green Onions", Quantity = 2, UnitId = units[2].Id },// pcs
            new() { RecipeId = recipes[27].Id, Name = "Sesame Oil", Quantity = 1, UnitId = units[6].Id },  // tbsp
            new() { RecipeId = recipes[27].Id, Name = "Sesame Seeds", Quantity = 1, UnitId = units[6].Id },// tbsp

            // ----- Recipe 29: Lentil and Sweet Potato Shepherd's Pie -----
            new() { RecipeId = recipes[28].Id, Name = "Lentils", Quantity = 250, UnitId = units[0].Id },   // g
            new() { RecipeId = recipes[28].Id, Name = "Sweet Potatoes", Quantity = 3, UnitId = units[2].Id }, // pcs
            new() { RecipeId = recipes[28].Id, Name = "Carrots", Quantity = 2, UnitId = units[2].Id },     // pcs
            new() { RecipeId = recipes[28].Id, Name = "Onion", Quantity = 1, UnitId = units[2].Id },       // pcs
            new() { RecipeId = recipes[28].Id, Name = "Vegetable Broth", Quantity = 500, UnitId = units[3].Id }, // ml
            new() { RecipeId = recipes[28].Id, Name = "Olive Oil", Quantity = 2, UnitId = units[6].Id },   // tbsp
            new() { RecipeId = recipes[28].Id, Name = "Thyme", Quantity = 1, UnitId = units[5].Id },       // tsp
            new() { RecipeId = recipes[28].Id, Name = "Salt & Pepper", Quantity = 1, UnitId = units[6].Id }, // tbsp

            // ----- Recipe 30: Caramelized Onion and Gruyere Tart -----
            new() { RecipeId = recipes[29].Id, Name = "Puff Pastry", Quantity = 1, UnitId = units[2].Id }, // pcs
            new() { RecipeId = recipes[29].Id, Name = "Onions", Quantity = 2, UnitId = units[2].Id },     // pcs
            new() { RecipeId = recipes[29].Id, Name = "Gruyere Cheese", Quantity = 150, UnitId = units[0].Id }, // g
            new() { RecipeId = recipes[29].Id, Name = "Butter", Quantity = 30, UnitId = units[0].Id },    // g
            new() { RecipeId = recipes[29].Id, Name = "Olive Oil", Quantity = 1, UnitId = units[6].Id },  // tbsp
            new() { RecipeId = recipes[29].Id, Name = "Thyme", Quantity = 1, UnitId = units[5].Id },      // tsp
            new() { RecipeId = recipes[29].Id, Name = "Salt", Quantity = 1, UnitId = units[6].Id },       // tbsp
            new() { RecipeId = recipes[29].Id, Name = "Black Pepper", Quantity = 1, UnitId = units[6].Id }, // tbsp

            // ----- Recipe 31: Coconut Mango Chia Pudding -----
            new() { RecipeId = recipes[30].Id, Name = "Chia Seeds", Quantity = 50, UnitId = units[0].Id }, // g
            new() { RecipeId = recipes[30].Id, Name = "Coconut Milk", Quantity = 200, UnitId = units[3].Id }, // ml
            new() { RecipeId = recipes[30].Id, Name = "Mango", Quantity = 1, UnitId = units[2].Id },       // pcs
            new() { RecipeId = recipes[30].Id, Name = "Honey", Quantity = 2, UnitId = units[6].Id },      // tbsp
            new() { RecipeId = recipes[30].Id, Name = "Vanilla Extract", Quantity = 1, UnitId = units[5].Id }, // tsp
            new() { RecipeId = recipes[30].Id, Name = "Coconut Flakes", Quantity = 10, UnitId = units[0].Id }, // g
            new() { RecipeId = recipes[30].Id, Name = "Salt", Quantity = 1, UnitId = units[12].Id },       // dash
            new() { RecipeId = recipes[30].Id, Name = "Lime Juice", Quantity = 1, UnitId = units[6].Id },  // tbsp

            // ----- Recipe 32: Lemon Herb Roasted Chicken -----
            new() { RecipeId = recipes[31].Id, Name = "Whole Chicken", Quantity = 1, UnitId = units[2].Id }, // pcs
            new() { RecipeId = recipes[31].Id, Name = "Lemon", Quantity = 2, UnitId = units[2].Id },        // pcs
            new() { RecipeId = recipes[31].Id, Name = "Garlic Cloves", Quantity = 4, UnitId = units[2].Id }, // pcs
            new() { RecipeId = recipes[31].Id, Name = "Fresh Herbs", Quantity = 10, UnitId = units[0].Id },  // g
            new() { RecipeId = recipes[31].Id, Name = "Olive Oil", Quantity = 3, UnitId = units[6].Id },     // tbsp
            new() { RecipeId = recipes[31].Id, Name = "Salt", Quantity = 1, UnitId = units[6].Id },          // tbsp
            new() { RecipeId = recipes[31].Id, Name = "Black Pepper", Quantity = 1, UnitId = units[6].Id },  // tbsp
            new() { RecipeId = recipes[31].Id, Name = "Butter", Quantity = 30, UnitId = units[0].Id },       // g

            // ----- Recipe 33: Szechuan Stir-Fry Noodles -----
            new() { RecipeId = recipes[32].Id, Name = "Noodles", Quantity = 200, UnitId = units[0].Id },      // g
            new() { RecipeId = recipes[32].Id, Name = "Bell Peppers", Quantity = 2, UnitId = units[2].Id },  // pcs
            new() { RecipeId = recipes[32].Id, Name = "Carrots", Quantity = 2, UnitId = units[2].Id },       // pcs
            new() { RecipeId = recipes[32].Id, Name = "Szechuan Sauce", Quantity = 3, UnitId = units[6].Id }, // tbsp
            new() { RecipeId = recipes[32].Id, Name = "Garlic Cloves", Quantity = 2, UnitId = units[2].Id }, // pcs
            new() { RecipeId = recipes[32].Id, Name = "Ginger", Quantity = 1, UnitId = units[5].Id },        // tsp
            new() { RecipeId = recipes[32].Id, Name = "Sesame Oil", Quantity = 1, UnitId = units[6].Id },    // tbsp
            new() { RecipeId = recipes[32].Id, Name = "Green Onions", Quantity = 2, UnitId = units[2].Id },  // pcs

            // ----- Recipe 34: Mediterranean Quinoa Salad -----
            new() { RecipeId = recipes[33].Id, Name = "Quinoa", Quantity = 200, UnitId = units[0].Id },      // g
            new() { RecipeId = recipes[33].Id, Name = "Cucumber", Quantity = 1, UnitId = units[2].Id },      // pcs
            new() { RecipeId = recipes[33].Id, Name = "Tomatoes", Quantity = 200, UnitId = units[0].Id },    // g
            new() { RecipeId = recipes[33].Id, Name = "Feta Cheese", Quantity = 100, UnitId = units[0].Id }, // g
            new() { RecipeId = recipes[33].Id, Name = "Olives", Quantity = 50, UnitId = units[0].Id },       // g
            new() { RecipeId = recipes[33].Id, Name = "Lemon Juice", Quantity = 2, UnitId = units[6].Id },   // tbsp
            new() { RecipeId = recipes[33].Id, Name = "Olive Oil", Quantity = 2, UnitId = units[6].Id },     // tbsp
            new() { RecipeId = recipes[33].Id, Name = "Salt & Pepper", Quantity = 1, UnitId = units[6].Id }, // tbsp
        };
        var orderedIngredients = ingredients
            .GroupBy(i => i.RecipeId)
            .SelectMany(g => g.Select((ingredient, index) =>
            {
                ingredient.Order = index + 1;
                return ingredient;
            }))
            .ToList();

        context.Ingredients.AddRange(orderedIngredients);

        var shoppingLists = new List<ShoppingList>
        {
            new()
            {
                UserId = users[0].Id,
                CreatedAt = DateTime.UtcNow.AddDays(-10),
                IsDeleted = false,
                Title = "List 1"
            },
            new()
            {
                UserId = users[0].Id,
                CreatedAt = DateTime.UtcNow.AddDays(-100),
                IsDeleted = false,
                Title = "List 2"
            }
        };

        context.ShoppingLists.AddRange(shoppingLists);

        var shoppingListItems = new List<ShoppingListItem>
        {
            new() { ShoppingListId = shoppingLists[0].Id, Name = "Tomato", Quantity = 4, UnitId = units[0].Id },
            new() { ShoppingListId = shoppingLists[0].Id, Name = "Cauliflower", Quantity = 1, UnitId = units[5].Id },
            new() { ShoppingListId = shoppingLists[0].Id, Name = "Onion", Quantity = 2, UnitId = units[0].Id },
            new() { ShoppingListId = shoppingLists[0].Id, Name = "Garlic", Quantity = 5, UnitId = units[0].Id },
            new() { ShoppingListId = shoppingLists[0].Id, Name = "Spaghetti Pasta", Quantity = 500, UnitId = units[2].Id },
            new() { ShoppingListId = shoppingLists[0].Id, Name = "Pancetta", Quantity = 200, UnitId = units[1].Id },
            new() { ShoppingListId = shoppingLists[0].Id, Name = "Parmesan", Quantity = 100, UnitId = units[1].Id },
            new() { ShoppingListId = shoppingLists[0].Id, Name = "Avocado", Quantity = 2, UnitId = units[0].Id },
            new() { ShoppingListId = shoppingLists[0].Id, Name = "Whole Grain Bread", Quantity = 1, UnitId = units[3].Id },

            // Shopping List 2 (user1)
            new() { ShoppingListId = shoppingLists[1].Id, Name = "Chicken", Quantity = 100, UnitId = units[1].Id },
            new() { ShoppingListId = shoppingLists[1].Id, Name = "Sauce", Quantity = 30, UnitId = units[6].Id },
        };

        var orderedItems = shoppingListItems
            .GroupBy(s => s.ShoppingListId)
            .SelectMany(g => g.Select((item, index) =>
            {
                item.Order = index + 1;
                return item;
            }))
            .ToList();

        context.ShoppingListItems.AddRange(orderedItems);

        var followers = new List<UserFollowing>();

        for (int i = 0; i < users.Count; i++)
        {
            var target = users[i];

            for (int j = 1; j <= 3; j++)
            {
                var observer = users[(i + j) % users.Count]; 
                followers.Add(new UserFollowing
                {
                    ObserverId = observer.Id,
                    TargetId = target.Id
                });
            }
        }
        context.UserFollowings.AddRange(followers);

        var favorites = new List<UserFavoriteRecipe>
            {
                new()
                {
                    UserId = users[0].Id,
                    RecipeId = recipes[1].Id,
                },
                new()
                {
                    UserId = users[1].Id,
                    RecipeId = recipes[2].Id,
                }
            };

        context.UserFavoriteRecipes.AddRange(favorites);
        await context.SaveChangesAsync();

    }
}
