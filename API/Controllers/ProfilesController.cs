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
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace API.Controllers
{
    public class ProfilesController : BaseApiController
    {
        [AllowAnonymous]
        [HttpGet("{userId}/recipes")]
        public async Task<ActionResult<List<RecipeDto>>> GetUserRecipes(string userId, [FromQuery] PaginationParams<DateTime?> paginationParams)
        {
            return HandleResult(await Mediator.Send(new GetUserRecipes.Query { UserId = userId, Params = paginationParams }));
        }
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<List<UserProfile>>> GetAllUsers([FromQuery] UserParams userParams)
        {
            return HandleResult(await Mediator.Send(new GetAllUsers.Query { Params = userParams }));
        }

        [AllowAnonymous]
        [HttpGet("{userId}")]//zwraca userprofiel=> id, firstname i lastname, przy wiekszej ilosci danych stworzyc nowe dto do alergenow itp
        public async Task<ActionResult<UserProfile>> GetUserDetails(string userId)
        {
            return HandleResult(await Mediator.Send(new GetUserDetails.Query { UserId = userId }));
        }

        [Authorize(Roles = StaticUserRoles.CREATOR)]
        [HttpPost("{userId}/follow")]
        public async Task<ActionResult> FollowToggle(string userId)
        {
            return HandleResult(await Mediator.Send(new FollowToggle.Command { TargetUserId = userId }));
        }

        [AllowAnonymous]
        [HttpGet("{userId}/follow-list")]
        public async Task<ActionResult> GetFollowings(string userId, string predicate)
        {
            return HandleResult(await Mediator.Send(new GetFollowing.Query { UserId = userId, Predicate = predicate }));
        }

        [Authorize(Roles = StaticUserRoles.CREATOR)]
        [HttpGet("favorites")]
        public async Task<ActionResult<List<Recipe>>> GetUserFavoriteRecipes([FromQuery] PaginationParams<DateTime?> paginationParams)
        {
            return HandleResult(await Mediator.Send(new GetFavoriteRecipes.Query { Params = paginationParams}));
        }

        [Authorize(Roles = StaticUserRoles.CREATOR)]
        [HttpPost("add-photo")]
        public async Task<ActionResult<Photo>> AddPhoto(IFormFile file)
        {
            return HandleResult(await Mediator.Send(new AddUserPhoto.Command { File = file }));
        }

        [AllowAnonymous]
        [HttpGet("{userId}/photos")]
        public async Task<ActionResult<List<Photo>>> GePhotosForUser(string userId)
        {
            return HandleResult(await Mediator.Send(new GetProfilePhotos.Query { UserId = userId }));
        }

        [Authorize(Roles = StaticUserRoles.CREATOR)]
        [HttpDelete("{photoId}/photos")]
        public async Task<ActionResult> DeletePhoto(string photoId)
        {
            return HandleResult(await Mediator.Send(new DeleteUserPhoto.Command { PhotoId = photoId }));
        }

        [Authorize(Roles = StaticUserRoles.CREATOR)]
        [HttpPut("{photoId}/setMain")]
        public async Task<ActionResult> SetMainPhoto(string photoId)
        {
            return HandleResult(await Mediator.Send(new SetMainPhoto.Command { PhotoId = photoId }));
        }
        [AllowAnonymous]
        [HttpGet("{userId}/recent-recipes")]
        public async Task<ActionResult<List<RecentRecipesDto>>> GetUserRecentRecipes(string userId)
        {
            return HandleResult (await Mediator.Send(new GetUserRecentRecipes.Query { UserId = userId}));
        }
    }
}