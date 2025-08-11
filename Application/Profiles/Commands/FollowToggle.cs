using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Persistence;

namespace Application.Profiles.Commands
{
    public class FollowToggle
    {
        public class Command : IRequest<Result<MediatR.Unit>>

        {
            public required string TargetUserId { get; set; }
        }

        public class Handler(AppDbContext context, IUserAccessor userAccessor) : IRequestHandler<Command, Result<MediatR.Unit>>
        {

            public async Task<Result<MediatR.Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var observer = await userAccessor.GetUserAsync();
                var target = await context.Users.FindAsync([request.TargetUserId], cancellationToken);

                if (target == null) return Result<MediatR.Unit>.Failure("Target user not found", 400);

                var following = await context.UserFollowings.FindAsync([observer.Id, target.Id], cancellationToken);

                if (following == null)
                    context.UserFollowings.Add(new UserFollowing
                    {
                        ObserverId = observer.Id,
                        TargetId = target.Id
                    });
                else context.UserFollowings.Remove(following);

                return await context.SaveChangesAsync(cancellationToken) > 0
                ? Result<MediatR.Unit>.Success(MediatR.Unit.Value)
                : Result<MediatR.Unit>.Failure("Problem updating following", 400);
                
            }
        }
    }
}