using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Allergens.DTOs;
using Application.Allergens.Queries;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AllergensController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<AllergenDto>>> GetAllAllergens()
        {
           return await Mediator.Send(new GetAllergens.Query());
        }
    }
}