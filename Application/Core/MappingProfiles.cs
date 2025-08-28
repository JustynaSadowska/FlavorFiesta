using System;
using Application.Allergens.DTOs;
using Application.Ingredients.DTOs;
using Application.Profiles.DTOs;
using Application.Recipes.DTOs;
using Application.Reviews.DTOs;
using Application.ShoppingLists.DTOs;
using Application.Steps.DTOs;
using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        string? currentUserId = null;
        CreateMap<Recipe, Recipe>();
        CreateMap<CreateRecipeDto, Recipe>();
        CreateMap<EditRecipeDto, Recipe>();
        CreateMap<Recipe, RecipeDto>()
            .ForMember(d => d.AuthorFirstName, o => o.MapFrom(s => s.User.FirstName))
            .ForMember(d => d.AuthorLastName, o => o.MapFrom(s => s.User.LastName))
            .ForMember(d => d.UserId, o => o.MapFrom(s => s.User.Id))
            .ForMember(d => d.User, o => o.MapFrom(s => s.User));

        CreateMap<User, UserProfile>()
            .ForMember(d => d.FirstName, o => o.MapFrom(s => s.FirstName))
            .ForMember(d => d.LastName, o => o.MapFrom(s => s.LastName))
            .ForMember(d => d.Id, o => o.MapFrom(s => s.Id))
            .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.Followers.Count))
            .ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.Followings.Count))
            .ForMember(d => d.Following, o => o.MapFrom(s => s.Followers.Any(x => x.ObserverId == currentUserId)));
        CreateMap<Step, StepDto>();
        CreateMap<Tag, TagDto>();
        CreateMap<Allergen, AllergenDto>();
        CreateMap<Ingredient, IngredientDto>();
        CreateMap<Unit, UnitDto>();
        CreateMap<CreateIngredientDto, Ingredient>();
        CreateMap<CreateStepDto, Step>();
        CreateMap<Review, ReviewDto>()
            .ForMember(d => d.ReviewAuthor, o => o.MapFrom(s => s.User));
        CreateMap<CreateReviewDto, Review>();
        CreateMap<EditReviewDto, Review>();
        CreateMap<ShoppingList, ShoppingListDto>();

    }
}
