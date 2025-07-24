using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Application.Reviews.DTOs;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Reviews.Commands
{
    public class CreateReview
    {

        public class Command : IRequest<Result<string>>
        {
            public required CreateReviewDto ReviewDto { get; set; }
        }

        public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Command, Result<string>>
        {
            public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await userAccessor.GetUserAsync();
                var recipe = await context.Recipes
                    .AsNoTracking()
                    .FirstOrDefaultAsync(r => r.Id == request.ReviewDto.RecipeId, cancellationToken);

                if (recipe == null)
                    return Result<string>.Failure("Recipe not found", 404);

                if (recipe.UserId == user.Id)
                    return Result<string>.Failure("You cannot review your own recipe", 403);

                var review = mapper.Map<Review>(request.ReviewDto);
                review.UserId = user.Id;
                review.User = user;
                review.CreatedAt = DateTime.UtcNow;
                context.Reviews.Add(review);

                var result = await context.SaveChangesAsync(cancellationToken) > 0;

                if (!result) return Result<string>.Failure("Failed to create the review", 400);

                return Result<string>.Success(review.Id);
            }
        }
    }
}