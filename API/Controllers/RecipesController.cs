using System;
using Application.Recipes.Commands;
using Application.Recipes.DTOs;
using Application.Recipes.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

public class RecipesController : BaseApiController
{
   //[AllowAnonymous]
   [HttpGet]
   public async Task<ActionResult<List<RecipeDto>>> GetRecipes()
   {
      return await Mediator.Send(new GetRecipeList.Query());
   }

   [HttpGet("{id}")]
   public async Task<ActionResult<RecipeDto>> GetRecipeDetail(string id)
   {
      return HandleResult(await Mediator.Send(new GetRecipeDetails.Query { Id = id }));
   }

   [HttpPost]
   public async Task<ActionResult<string>> CreateRecipe(CreateRecipeDto recipeDto)
   {
      return HandleResult(await Mediator.Send(new CreateRecipe.Command { RecipeDto = recipeDto }));
   }

   [HttpPut("{id}")]
   [Authorize(Policy = "IsRecipeAuthor")]
   public async Task<ActionResult> EditRecipe(string id, [FromBody] EditRecipeDto recipe)
   {
      recipe.Id = id;
      return HandleResult(await Mediator.Send(new EditRecipe.Command { RecipeDto = recipe }));
   }

   [HttpDelete("{id}")]
   [Authorize(Policy = "IsRecipeAuthor")]
   public async Task<ActionResult> DeleteRecipe(string id)
   {
      return HandleResult(await Mediator.Send(new DeleteRecipe.Command { Id = id }));
   }

   [HttpPost("{id}/visibility")]
   public async Task<ActionResult> UpdateVisibility(string id)
   {
      return HandleResult(await Mediator.Send(new UpdateVisibility.Command { Id = id }));
   }

   [HttpGet("tags")]
   public async Task<ActionResult<List<TagDto>>> GetTags()
   {
      return await Mediator.Send(new GetTags.Query());
   }

   [HttpGet("units")]
   public async Task<ActionResult<List<UnitDto>>> GetUnits()
   {
      return await Mediator.Send(new GetUnits.Query());
   }
   [HttpPost("{id}/favorites")]
   public async Task<ActionResult> AddToFavorites(string id)
   {
      return HandleResult(await Mediator.Send(new AddToFavorites.Command { Id = id }));
   }

   [HttpDelete("{id}/favorites")]
   public async Task<ActionResult> RemoveFromFavorites(string id)
   {
      return HandleResult(await Mediator.Send(new RemoveFromFavorites.Command { Id = id }));
   }


}
