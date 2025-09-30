using Application.Core;
using Application.Reviews.DTOs;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Services
{
    public class RatingService(AppDbContext context)
    {
        public async Task<Result<RatingDto>> GetAndUpdateRatings(string recipeId)
        {
            // Przelicz średnią i liczbę recenzji
            var rating = await context.Reviews
                .Where(r => r.RecipeId == recipeId && !r.IsDeleted)
                .GroupBy(r => r.RecipeId)
                .Select(g => new 
                { 
                    AverageRating = Math.Round(g.Average(r => (double?)r.Rating) ?? 0, 2),
                    ReviewCount = g.Count()
                })
                .FirstOrDefaultAsync();

            rating ??= new { AverageRating = 0.0, ReviewCount = 0 };

            // Pobierz przepis i zaktualizuj średnią w bazie
            var recipe = await context.Recipes.FirstOrDefaultAsync(r => r.Id == recipeId);
            if (recipe == null)
                return Result<RatingDto>.Failure("Recipe not found", 404);

            recipe.AverageRating = rating.AverageRating;
            recipe.ReviewCount = rating.ReviewCount;

            await context.SaveChangesAsync();

            // Zwróć wynik
            var resultDto = new RatingDto
            {
                AverageRating = rating.AverageRating,
                ReviewCount = rating.ReviewCount
            };

            return Result<RatingDto>.Success(resultDto);
        }
    }
}
