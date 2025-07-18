using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Profiles.DTOs;
using Application.Profiles.Queries;
using Application.Recipes.DTOs;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfilesController : BaseApiController
    {
        [HttpGet("{userId}/recipes")]
        public async Task<ActionResult<List<RecipeDto>>> GetUserRecipes(string userId)
        {
            return await Mediator.Send(new GetUserRecipes.Query { UserId = userId });
        }

        [HttpGet]
        public async Task<ActionResult<List<UserProfile>>> GetAllUsers()
        {
            return await Mediator.Send(new GetAllUsers.Query());
        }

        [HttpGet("{userId}")]//zwraca userprofiel=> id, firstname i lastname, przy wiekszej ilosci danych stworzyc nowe dto do alergenow itp
        public async Task<ActionResult<UserProfile>> GetUserDetails(string userId)
        {
            return HandleResult( await Mediator.Send(new GetUserDetails.Query { UserId = userId }));
        }
    }
}