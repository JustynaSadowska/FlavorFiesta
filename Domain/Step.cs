using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Step
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public required string RecipeId { get; set; }
        public required string Description { get; set; }
        public int Order { get; set; } 

        public Recipe Recipe { get; set; } = null!;
    }
}