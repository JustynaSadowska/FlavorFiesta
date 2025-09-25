using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Recipes.DTOs
{
    public class RecentRecipesDto
    {
        public required string Id { get; set; }
        public string? ImageUrl { get; set; }
    }
}