using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Recipes.DTOs
{
    public class UnitDto
    {
        public required string Id { get; set; } 
        public required string DisplayName { get; set; }
    }
}