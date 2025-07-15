using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Recipes.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Recipes.Queries
{
    public class GetUnits
    {
        public class Query : IRequest<List<UnitDto>> {}

        public class Handler(AppDbContext context,  IMapper mapper) : IRequestHandler<Query, List<UnitDto>>
        {
            public async Task<List<UnitDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await context.Units.
                ProjectTo<UnitDto>(mapper.ConfigurationProvider)
                    .ToListAsync (cancellationToken);
            }
        }
    }
}