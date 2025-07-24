using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using MediatR;
using Persistence;

namespace Application.Reviews.Commands
{
    public class DeleteReview
    {
        public class Command : IRequest<Result<Unit>>
        {
            public required string Id { get; set; }
        }

        public class Handler(AppDbContext context) : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var review = await context.Reviews.FindAsync(request.Id, cancellationToken);

                if (review == null || review.IsDeleted == true) return Result<Unit>.Failure("Review not found", 404);

                review.IsDeleted = true;

                var result = await context.SaveChangesAsync(cancellationToken) > 0;

                if (!result) return Result<Unit>.Failure("Failed to delete the review", 400);

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}