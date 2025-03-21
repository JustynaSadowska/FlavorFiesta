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

   [HttpGet( "{id}" )]
   public async Task<ActionResult<Recipe>> GetRecipeDetail(string id) 
   {
      var recipe = await context.Recipes.FindAsync(id);

      if (recipe == null) return NotFound();

      return recipe;
   }
}
