using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Application.Services;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Reviews.Commands
{
    public class DeleteReview
    {
        public class Command : IRequest<Result<MediatR.Unit>>
        {
            public required string Id { get; set; }
        }

        public class Handler(AppDbContext context, RatingService ratingService, IUserAccessor userAccessor, UserManager<User> userManager, IExtendedEmailSender emailSender) : IRequestHandler<Command, Result<MediatR.Unit>>
        {
            public async Task<Result<MediatR.Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var review = await context.Reviews
                    .Include(r => r.User)
                    .Include(r => r.Recipe)
                    .FirstOrDefaultAsync(r => r.Id == request.Id, cancellationToken);

                if (review == null || review.IsDeleted == true) return Result<MediatR.Unit>.Failure("Review not found", 404);

                var currentUser = await userAccessor.GetUserAsync();
                if (currentUser == null)
                    return Result<MediatR.Unit>.Failure("Unauthorized", 401);

                var userRoles = await userManager.GetRolesAsync(currentUser);
                var isAdmin = userRoles.Contains(StaticUserRoles.ADMIN);
                
                var isAuthor = review.UserId == currentUser.Id;

                if (!isAuthor && !isAdmin)
                return Result<MediatR.Unit>.Failure("Forbidden", 403);

                review.IsDeleted = true;

                var result = await context.SaveChangesAsync(cancellationToken) > 0;

                if (!result) return Result<MediatR.Unit>.Failure("Failed to delete the review", 400);
                
                if (isAdmin && review.User != null)
                {
                    var recipeTitle = review.Recipe.Title ?? "a recipe you commented on";
                    await emailSender.SendDeletionNoticeAsync(review.User, recipeTitle, "review for the recipe: ");
                }

                var recipeId = review.RecipeId;

                var ratingResult = await ratingService.GetAndUpdateRatings(recipeId);

                if (!ratingResult.IsSuccess) return Result<MediatR.Unit>.Failure("Failed to update average rating", 500);

                return Result<MediatR.Unit>.Success(MediatR.Unit.Value);
            }
        }
    }
}