using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Reviews.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Reviews.Queries
{
    public class GetReviewList
    {
        public class Query : IRequest<List<ReviewDto>>
        { 
            public required string Id { get; set; }
        }
        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, List<ReviewDto>>
        {
            public async Task<List<ReviewDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await context.Reviews
                    .Where(x => x.IsDeleted == false && x.Recipe.Id == request.Id)
                    .ProjectTo<ReviewDto>(mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);
            }
        }

    }
}