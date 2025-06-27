using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Allergens.DTOs
{
    public class AllergenDto
    {
        public required string Id { get; set; }
        public required string Name { get; set; }
    }
}