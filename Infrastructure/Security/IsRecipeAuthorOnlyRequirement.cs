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
    public class IsRecipeAuthorOnlyRequirement : IAuthorizationRequirement {}
    public class IsRecipeAuthorOnlyRequirementHandler(AppDbContext dbContext, IHttpContextAccessor httpContextAccessor) 
    : AuthorizationHandler<IsRecipeAuthorOnlyRequirement>
    {
        protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, IsRecipeAuthorOnlyRequirement requirement)
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return;

            var httpContext = httpContextAccessor.HttpContext;

            if (httpContext?.GetRouteValue("id") is not string recipeId) return;

            var recipe = await dbContext.Recipes
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.Id == recipeId);

            if (recipe == null) return;

            if (recipe.UserId == userId)
            {
                context.Succeed(requirement); 
            }
        }
    }
}
