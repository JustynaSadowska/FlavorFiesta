using System;
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
    }
}
