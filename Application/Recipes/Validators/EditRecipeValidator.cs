using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Application.Recipes.Commands;
using Application.Recipes.DTOs;
using FluentValidation;

namespace Application.Recipes.Validators
{
    public class EditRecipeValidator : BaseRecipeValidator<EditRecipe.Command, EditRecipeDto>
    {
        public EditRecipeValidator() : base(x => x.RecipeDto)
        {
            RuleFor(x => x.RecipeDto.Id)
                .NotEmpty().WithMessage("Id is required");
        }
    }
}