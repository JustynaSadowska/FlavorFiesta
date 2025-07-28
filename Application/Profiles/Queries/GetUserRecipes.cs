using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Interfaces;
using Application.Recipes.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.Services;

namespace Application.Profiles.Queries
{
    public class GetUserRecipes
    {
        public class Query : IRequest<List<RecipeDto>>
        {
            public required string UserId { get; set; }
        }

        public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor, RatingService ratingService) : IRequestHandler<Query, List<RecipeDto>>
        {
            public async Task<List<RecipeDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var currentUser = await userAccessor.GetUserAsync();
                var query = context.Recipes.Where(x => x.IsDeleted == false && x.UserId == request.UserId);

                if (request.UserId != currentUser.Id)
                {
                    query = query.Where(x => x.IsVisible);//jesli user jest na swoim profilu to widzi swoje wszystkie przepisy
                }
                
                var recipes = await query
                    .ProjectTo<RecipeDto>(mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);
                    
                foreach (var recipe in recipes)
                {
                    var ratingResult = await ratingService.GetRatings(recipe.Id);

                    if (ratingResult.Value != null)
                    {
                        recipe.AverageRating = ratingResult.Value.AverageRating;
                        recipe.ReviewCount = ratingResult.Value.ReviewCount;
                    }
                    else
                    {
                        recipe.AverageRating = 0;
                        recipe.ReviewCount = 0;
                    }
                }
                return recipes;
                 
            }
        }
    }
}