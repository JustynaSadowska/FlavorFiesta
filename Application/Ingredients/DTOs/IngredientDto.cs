using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Recipes.DTOs;

namespace Application.Ingredients.DTOs
{
    public class IngredientDto
    {
        public required string Id { get; set; }
        public required string Name { get; set; }
        public required decimal Quantity { get; set; }
        public UnitDto Unit { get; set; } = null!;

    }
}