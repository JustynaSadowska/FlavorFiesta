using System;
using Application.Recipes.Commands;
using Application.Recipes.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

public class RecipesController : BaseApiController
{
   [HttpGet]
   public async Task<ActionResult<List<Recipe>>> GetRecipes()
   {
      return await Mediator.Send(new GetRecipeList.Query());
   }

   [HttpGet("{id}")]
   public async Task<ActionResult<Recipe>> GetRecipeDetail(string id)
   {
      return await Mediator.Send(new GetRecipeDetails.Query{Id = id});
   }

   [HttpPost]
   public async Task<ActionResult<string>> CreateRecipe(Recipe recipe)
   {
      return await Mediator.Send(new CreateRecipe.Command{Recipe = recipe});
   }

   [HttpPut]
   public async Task<ActionResult> EditRecipe(Recipe recipe)
   {
      await Mediator.Send(new EditRecipe.Command{ Recipe = recipe });

      return NoContent();
   }

   [HttpDelete("{id}")]
   public async Task<ActionResult> DeleteRecipe(string id)
   {
      await Mediator.Send(new DeleteRecipe.Command{ Id=id });

      return Ok();
   }

}
