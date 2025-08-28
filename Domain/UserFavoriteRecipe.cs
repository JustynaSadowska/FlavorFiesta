using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class UserFavoriteRecipe
    {
        public required string UserId { get; set; }
        public required string RecipeId { get; set; }
        public Recipe Recipe { get; set; } = null!; // Ulubiony przepis
        public User User { get; set; } = null!; // Użytkownik, który dodał przepis do ulubionych

    }
}