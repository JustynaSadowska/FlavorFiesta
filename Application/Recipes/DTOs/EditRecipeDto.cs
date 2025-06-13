using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Recipes.DTOs
{
    public class EditRecipeDto : BaseRecipeDto
    {
        public string Id { get; set; } = "";
    }
}