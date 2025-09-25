using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Profiles.Commands;
using Application.Profiles.DTOs;
using Application.Profiles.Queries;
using Application.Recipes.DTOs;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfilesController : BaseApiController
    {
        [HttpGet("{userId}/recipes")]
        public async Task<ActionResult<List<RecipeDto>>> GetUserRecipes(string userId, [FromQuery] PaginationParams<DateTime?> paginationParams)
        {
            return HandleResult(await Mediator.Send(new GetUserRecipes.Query { UserId = userId, Params = paginationParams }));
        }

        [HttpGet]
        public async Task<ActionResult<List<UserProfile>>> GetAllUsers()
        {
            return await Mediator.Send(new GetAllUsers.Query());
        }

        [HttpGet("{userId}")]//zwraca userprofiel=> id, firstname i lastname, przy wiekszej ilosci danych stworzyc nowe dto do alergenow itp
        public async Task<ActionResult<UserProfile>> GetUserDetails(string userId)
        {
            return HandleResult(await Mediator.Send(new GetUserDetails.Query { UserId = userId }));
        }

        [HttpPost("{userId}/follow")]
        public async Task<ActionResult> FollowToggle(string userId)
        {
            return HandleResult(await Mediator.Send(new FollowToggle.Command { TargetUserId = userId }));
        }

        [HttpGet("{userId}/follow-list")]
        public async Task<ActionResult> GetFollowings(string userId, string predicate)
        {
            return HandleResult(await Mediator.Send(new GetFollowing.Query { UserId = userId, Predicate = predicate }));
        }

        [HttpGet("favorites")]
        public async Task<ActionResult<List<Recipe>>> GetUserFavoriteRecipes([FromQuery] PaginationParams<DateTime?> paginationParams)
        {
            return HandleResult(await Mediator.Send(new GetFavoriteRecipes.Query { Params = paginationParams}));
        }

        [HttpPost("add-photo")]
        public async Task<ActionResult<Photo>> AddPhoto(IFormFile file)
        {
            return HandleResult(await Mediator.Send(new AddUserPhoto.Command { File = file }));
        }

        [HttpGet("{userId}/photos")]
        public async Task<ActionResult<List<Photo>>> GePhotosForUser(string userId)
        {
            return HandleResult(await Mediator.Send(new GetProfilePhotos.Query { UserId = userId }));
        }

        [HttpDelete("{photoId}/photos")]
        public async Task<ActionResult> DeletePhoto(string photoId)
        {
            return HandleResult(await Mediator.Send(new DeleteUserPhoto.Command { PhotoId = photoId }));
        }

        [HttpPut("{photoId}/setMain")]
        public async Task<ActionResult> SetMainPhoto(string photoId)
        {
            return HandleResult(await Mediator.Send(new SetMainPhoto.Command { PhotoId = photoId }));
        }
        
        [HttpGet("{userId}/recent-recipes")]
        public async Task<ActionResult<List<RecentRecipesDto>>> GetUserRecentRecipes(string userId)
        {
            return HandleResult (await Mediator.Send(new GetUserRecentRecipes.Query { UserId = userId}));
        }
    }
}