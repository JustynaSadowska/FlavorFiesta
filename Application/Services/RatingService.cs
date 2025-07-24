using Application.Core;
using Application.Reviews.DTOs;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Services
{
    public class RatingService(AppDbContext context)
    {
        public async Task<Result<RatingDto>> GetRatings(string recipeId)
        {
            var ratings = await context.Reviews
                .Where(r => r.RecipeId == recipeId)
                .Select(r => r.Rating)
                .ToListAsync();
                
            int count = ratings.Count;

            double average = count > 0 ? ratings.Average() : 0;
            var result = new RatingDto
            {
                AverageRating = Math.Round(average, 2),
                ReviewCount = count,
            };
            return Result<RatingDto>.Success(result); 
        }
    }
}
