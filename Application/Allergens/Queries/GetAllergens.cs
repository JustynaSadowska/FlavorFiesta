using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Allergens.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Allergens.Queries
{
    public class GetAllergens
    {
        public class Query : IRequest<List<AllergenDto>> {}

        public class Handler(AppDbContext context,  IMapper mapper) : IRequestHandler<Query, List<AllergenDto>>
        {
            public async Task<List<AllergenDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await context.Allergens.
                ProjectTo<AllergenDto>(mapper.ConfigurationProvider).ToListAsync
                    (cancellationToken);
            }
        }
    }
}