using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Application.Recipes.Commands;
using Application.Recipes.DTOs;
using FluentValidation;

namespace Application.Recipes.Validators
{
    public class CreateRecipeValidator : BaseRecipeValidator<CreateRecipe.Command, CreateRecipeDto>
    {
        public CreateRecipeValidator() : base(x => x.RecipeDto)
        {
        }
    }
}