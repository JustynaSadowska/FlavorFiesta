using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Allergens.DTOs;
using Application.Core;
using Application.Interfaces;
using Application.Recipes.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Allergens.Queries
{
    public class GetUserAllergens
    {
        public class Query : IRequest<List<AllergenDto>>{}
        public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Query, List<AllergenDto>>
        {
            public async Task<List<AllergenDto>> Handle(Query request, CancellationToken cancellationToken)
            {

                var userId = userAccessor.GetUserId();

                return await context.Users
                    .Where(u => u.Id == userId)
                    .SelectMany(u => u.Allergens!)
                    .ProjectTo<AllergenDto>(mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

            }
        }
    }
}