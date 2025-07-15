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
    public class GetTags
    {
        public class Query : IRequest<List<TagDto>> {}

        public class Handler(AppDbContext context,  IMapper mapper) : IRequestHandler<Query, List<TagDto>>
        {
            public async Task<List<TagDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await context.Tags.
                ProjectTo<TagDto>(mapper.ConfigurationProvider)
                    .ToListAsync (cancellationToken);
            }
        }
    }
}