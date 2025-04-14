using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Tag
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public required string Name { get; set; }

        public ICollection<Recipe> Recipes { get; set; } = [];
    }
}