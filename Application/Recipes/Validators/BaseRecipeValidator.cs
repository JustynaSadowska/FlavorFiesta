using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Recipes.DTOs;
using FluentValidation;

namespace Application.Recipes.Validators
{
    public class BaseRecipeValidator<T, TDto> : AbstractValidator<T> where TDto : BaseRecipeDto
    {
        public BaseRecipeValidator(Func<T, TDto> selector)
        {
            RuleFor(x => selector(x).Title)
                .NotEmpty().WithMessage("Title is required")
                .MaximumLength(100).WithMessage("Title must not exceed 100 characters");

            RuleFor(x => selector(x).PreparationTime)
                .NotEmpty().WithMessage("Time is required");

            RuleFor(x => selector(x).Difficulty)
                .NotEmpty().WithMessage("Difficulty is required");

            RuleFor(x => selector(x).Servings)
                .NotEmpty().WithMessage("Servings are required");
        }
    }
}