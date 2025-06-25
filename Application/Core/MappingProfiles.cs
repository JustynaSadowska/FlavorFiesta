using System;
using Application.Profiles.DTOs;
using Application.Recipes.DTOs;
using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Recipe, Recipe>();
        CreateMap<CreateRecipeDto, Recipe>();
        CreateMap<EditRecipeDto, Recipe>();
        CreateMap<Recipe, RecipeDto>()
            .ForMember(d => d.FirstName, o => o.MapFrom(s => s.User.FirstName))
            .ForMember(d => d.LastName, o => o.MapFrom(s => s.User.LastName))
            .ForMember(d => d.UserId, o => o.MapFrom(s => s.User.Id))
            .ForMember(d => d.User, o => o.MapFrom(s => s.User));

        CreateMap<User, UserProfile>()
            .ForMember(d => d.FirstName, o => o.MapFrom(s => s.FirstName))
            .ForMember(d => d.LastName, o => o.MapFrom(s => s.LastName))
            .ForMember(d => d.Id, o => o.MapFrom(s => s.Id));
    }
}
