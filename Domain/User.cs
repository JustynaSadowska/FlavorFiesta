using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class User : IdentityUser
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? ImageUrl { get; set; }

        public ICollection<Recipe>? Recipes { get; set; } = [];
        public ICollection<Review>? Reviews { get; set; } = [];
        public ICollection<ShoppingList>? ShoppingLists { get; set; } = [];
        public ICollection<Allergen>? Allergens { get; set; } = [];
        public ICollection<UserFollowing> Followings { get; set; } = [];
        public ICollection<UserFollowing> Followers { get; set; } = [];
        public ICollection<UserFavoriteRecipe>? FavoriteRecipes { get; set; } = [];
        public ICollection<Photo> Photos { get; set; } = [];
    }
}