using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Allergens.DTOs;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Allergens.Commands
{
    public class UpdateUserAllergens
    {
        public class Command : IRequest<Result<MediatR.Unit>>
        { 
           public List<string> AllergenIds { get; set; } = [];
        }

        public class Handler(AppDbContext context, IUserAccessor userAccessor) : IRequestHandler<Command, Result<MediatR.Unit>>
        {
            public async Task<Result<MediatR.Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await context.Users
                    .Include(u => u.Allergens)
                    .FirstOrDefaultAsync(u => u.Id == userAccessor.GetUserId(), cancellationToken);

                if (user == null)
                return Result<MediatR.Unit>.Failure("User not found", 404);

                if (user.Allergens != null && user.Allergens.Count != 0)
                {
                    user.Allergens.Clear();
                }
                else
                {
                    user.Allergens = [];
                }

                var allergens = await context.Allergens
                    .Where(a => request.AllergenIds.Contains(a.Id))
                    .ToListAsync(cancellationToken);

                user.Allergens = allergens;

                var result = await context.SaveChangesAsync(cancellationToken) > 0;

                if (!result)
                    return Result<MediatR.Unit>.Failure("Failed to update allergens", 400);

                return Result<MediatR.Unit>.Success(MediatR.Unit.Value);
                
            }

        }

    }
}