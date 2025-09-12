using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain
{
    public class Photo
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public required string Url { get; set; }
        public required string PublicId { get; set; }

        public string? UserId { get; set; }
        public string? RecipeId { get; set; }

        [JsonIgnore]
        public User User { get; set; } = null!;

        [JsonIgnore]
        public Recipe Recipe { get; set; } = null!;
    }
}