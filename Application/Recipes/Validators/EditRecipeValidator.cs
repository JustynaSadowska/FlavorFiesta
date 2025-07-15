using System;
using System.Collections.Generic;
using Application.Recipes.Commands;
using FluentValidation;


namespace Application.Recipes.Validators
{
    public class EditRecipeValidator: AbstractValidator<EditRecipe.Command>
    {
        public EditRecipeValidator()
        {
            RuleFor(x => x.RecipeDto.Title)
                .NotEmpty().WithMessage("Title is required")
                .MaximumLength(100).WithMessage("Title must not exceed 100 characters");

            RuleFor(x => x.RecipeDto.PreparationTime)
                .NotEmpty().WithMessage("Time is required");

            RuleFor(x => x.RecipeDto.Difficulty)
                .NotEmpty().WithMessage("Difficulty is required");

            RuleFor(x => x.RecipeDto.Servings)
                .NotEmpty().WithMessage("Servings are required");

            RuleFor(x => x.RecipeDto.Steps)
                .NotEmpty().WithMessage("At least one step is required");

            RuleFor(x => x.RecipeDto.Ingredients)
                .NotEmpty().WithMessage("At least one ingredient is required");

            RuleFor(x => x.RecipeDto.TagsIds)
                .NotEmpty().WithMessage("At least one tag is required");
                
        }
    }
}