using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Reviews.Commands;
using Application.Reviews.DTOs;
using Application.Reviews.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ReviewsController : BaseApiController
    {
        [HttpGet("{recipeId}")]//pobiera liste recenzji dla danego przepisu 
        public async Task<ActionResult<List<ReviewDto>>> GetReviewList(string recipeId)
        {
            return await Mediator.Send(new GetReviewList.Query { Id = recipeId });
        }
        [HttpPost]
        public async Task<ActionResult<string>> CreateRecipe(CreateReviewDto reviewDto)
        {
            return HandleResult(await Mediator.Send(new CreateReview.Command { ReviewDto = reviewDto }));
        }
        [HttpPut("{id}")]
        [Authorize(Policy = "IsReviewAuthor")]
        public async Task<ActionResult<string>> EditRecipe(string id, [FromBody] EditReviewDto review)
        {
            review.Id = id;
            return HandleResult(await Mediator.Send(new EditReview.Command { ReviewDto = review }));
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "IsReviewAuthor")]
        public async Task<ActionResult> DeleteRecipe(string id)
        {
            return HandleResult(await Mediator.Send(new DeleteReview.Command { Id = id }));
        }
    }
}