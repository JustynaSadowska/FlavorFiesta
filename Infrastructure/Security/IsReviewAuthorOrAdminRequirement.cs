using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security
{
    public class IsReviewAuthorOrAdminRequirement : IAuthorizationRequirement
    {

    }
    public class IsReviewAuthorOrAdminRequirementHandler(AppDbContext dbContext, IHttpContextAccessor httpContextAccessor) : AuthorizationHandler<IsReviewAuthorOrAdminRequirement>
    {

        protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, IsReviewAuthorOrAdminRequirement requirement)
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return;
            
            var role = context.User.FindFirstValue(ClaimTypes.Role);
            if (role == StaticUserRoles.ADMIN)
            {
                context.Succeed(requirement);
                return;
            }            
            var httpContext = httpContextAccessor.HttpContext;

            if (httpContext?.GetRouteValue("id") is not string reviewId) return;
            var review = await dbContext.Reviews.AsNoTracking().SingleOrDefaultAsync(x => x.Id == reviewId);
            if (review == null) return;

            if (review.UserId == userId)
            {
                context.Succeed(requirement);
            }

        }
    }
}