using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Ingredients.DTOs
{
    public class CreateIngredientDto
    {
        public required string Name { get; set; }
        public required decimal Quantity { get; set; }
        public required string UnitId { get; set; }
        public int Order { get; set; }
    }
}