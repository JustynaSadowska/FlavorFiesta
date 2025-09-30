using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Application.Reviews.DTOs;
using Application.Services;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Reviews.Commands
{
    public class EditReview
    {
        public class Command : IRequest<Result<Unit>>
        {
            public required EditReviewDto ReviewDto { get; set; }
        }

        public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor, RatingService ratingService)  : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await userAccessor.GetUserAsync();

                var review = await context.Reviews.FirstOrDefaultAsync(x => x.Id == request.ReviewDto.Id, cancellationToken);

                if (review == null)
                    return Result<MediatR.Unit>.Failure("Review not found", 404);

                var recipe = await context.Recipes
                    .AsNoTracking()
                    .FirstOrDefaultAsync(r => r.Id == request.ReviewDto.RecipeId, cancellationToken);

                if (recipe == null)
                    return Result<Unit>.Failure("Recipe not found", 404);

                if (recipe.UserId == user.Id)
                    return Result<Unit>.Failure("You cannot review your own recipe", 403);

                review.Rating = request.ReviewDto.Rating;
                review.Comment = request.ReviewDto.Comment;
                mapper.Map(request.ReviewDto, review);


                var result = await context.SaveChangesAsync(cancellationToken) > 0;

                if (!result) return Result<Unit>.Failure("Failed to update the review", 400);

                var ratingResult = await ratingService.GetAndUpdateRatings(request.ReviewDto.RecipeId);
                if (!ratingResult.IsSuccess)
                    return Result<Unit>.Failure("Failed to update average rating", 500);

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}