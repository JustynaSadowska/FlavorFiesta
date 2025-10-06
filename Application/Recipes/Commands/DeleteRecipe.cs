using System;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Recipes.Commands;

public class DeleteRecipe
{
    public class Command : IRequest<Result<MediatR.Unit>>
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context, IUserAccessor userAccessor, UserManager<User> userManager, IExtendedEmailSender emailSender) : IRequestHandler<Command, Result<MediatR.Unit>>
    {
        public async Task<Result<MediatR.Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var recipe = await context.Recipes
                .Include(r => r.User)
                .Include(r => r.Reviews)
                .FirstOrDefaultAsync(r => r.Id == request.Id, cancellationToken);

            if (recipe == null || recipe.IsDeleted == true) return Result<MediatR.Unit>.Failure("Recipe not found", 404);

            var currentUser = await userAccessor.GetUserAsync();
            if (currentUser == null)
                return Result<MediatR.Unit>.Failure("Unauthorized", 401);

            var userRoles = await userManager.GetRolesAsync(currentUser);
            var isAdmin = userRoles.Contains(StaticUserRoles.ADMIN);
            var isAuthor = recipe.UserId == currentUser.Id;

            if (!isAuthor && !isAdmin)
                return Result<MediatR.Unit>.Failure("Forbidden", 403);

            recipe.IsDeleted = true;
            if (recipe.Reviews != null)
            {
                foreach (var review in recipe.Reviews)
                {
                    review.IsDeleted = true;
                }
            }

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<MediatR.Unit>.Failure("Failed to delete the recipe", 400);

            if (isAdmin && recipe.User != null)
            {
                await emailSender.SendDeletionNoticeAsync(recipe.User, recipe.Title, "recipe");
            }


            return Result<MediatR.Unit>.Success(MediatR.Unit.Value);
        }

    }
}
