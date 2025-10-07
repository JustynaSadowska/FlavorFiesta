using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Allergens.Commands;
using Application.Allergens.DTOs;
using Application.Allergens.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace API.Controllers
{
    public class AllergensController : BaseApiController
    {
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<List<AllergenDto>>> GetAllAllergens()
        {
            return await Mediator.Send(new GetAllergens.Query());
        }
        
        [Authorize(Roles = StaticUserRoles.CREATOR)]
        [HttpGet("user")]
        public async Task<ActionResult<List<AllergenDto>>> GetUserAllergens()
        {
           return await Mediator.Send(new GetUserAllergens.Query());
        }

        [Authorize(Roles = StaticUserRoles.CREATOR)]
        [HttpPut]
        public async Task<ActionResult<List<AllergenDto>>> UpdateUserAllergens([FromBody] List<string> allergenIds)
        {
            return HandleResult(await Mediator.Send(new UpdateUserAllergens.Command { AllergenIds = allergenIds }));
        }

    }
}