using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Ingredient
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public required string RecipeId { get; set; }
        public required string Name { get; set; }
        public required decimal Quantity { get; set; }
        public required string UnitId { get; set; }

        public Recipe Recipe { get; set; } = null!;
        public Unit Unit { get; set; } = null!;
    }
}