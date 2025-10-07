using System;
using System.Security.Claims;
using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security;

public class IsRecipeAuthorOrAdminRequirement : IAuthorizationRequirement {}
public class IsRecipeAuthorOrAdminRequirementHandler(AppDbContext dbContext, IHttpContextAccessor httpContextAccessor) 
    : AuthorizationHandler<IsRecipeAuthorOrAdminRequirement>
{
    protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, IsRecipeAuthorOrAdminRequirement requirement)
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