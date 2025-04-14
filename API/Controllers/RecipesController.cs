using System;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

public class RecipesController(AppDbContext context) : BaseApiController
{
   [HttpGet]
   public async Task<ActionResult<List<Recipe>>> GetRecipes()
   {
      return await context.Recipes.ToListAsync();
   }

   [HttpGet("{id}")]
   public async Task<ActionResult<Recipe>> GetRecipeDetail(string id)
   {
      var recipe = await context.Recipes.FindAsync(id);

      if (recipe == null) return NotFound();

      return recipe;
   }

   [HttpGet("user/{userId}")]
   public async Task<ActionResult<List<Recipe>>> GetUserRecipes(string userId)
   {
      var recipes = await context.Recipes
                                 .Where(r => r.UserId == userId)
                                 .ToListAsync();

      if (recipes == null) return NotFound();

      return Ok(recipes);
   }

   [HttpGet("step/{recipeId}")]
   public async Task<ActionResult<List<Recipe>>> GetURecipeSteps(string recipeId)
   {
      var steps = await context.Steps
                                 .Where(s => s.RecipeId == recipeId)
                                 .ToListAsync();

      if (steps == null) return NotFound();

      return Ok(steps);
   }

}
