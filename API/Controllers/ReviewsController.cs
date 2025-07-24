using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Reviews.DTOs;
using Application.Reviews.Queries;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ReviewsController : BaseApiController
    {
        [HttpGet ("{recipeId}")]//pobiera liste recenzji dla danego przepisu 
        public async Task<ActionResult<List<ReviewDto>>> GetReviewList(string recipeId)
        {
            return await Mediator.Send(new GetReviewList.Query{ Id = recipeId });
        }
    }
}