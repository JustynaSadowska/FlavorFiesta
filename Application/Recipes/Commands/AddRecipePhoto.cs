using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos.Commands;

public class AddRecipePhoto
{
    public class Command : IRequest<Result<Photo>>
    {
        public string RecipeId { get; set; } = null!;
        public required IFormFile File { get; set; }
    }

    public class Handler(AppDbContext context, IPhotoService photoService) : IRequestHandler<Command, Result<Photo>>
    {
        public async Task<Result<Photo>> Handle(Command request, CancellationToken cancellationToken)
        {
            
            var recipe = await context.Recipes
                .Include(r => r.Photo)
                .FirstOrDefaultAsync(r => r.Id == request.RecipeId, cancellationToken);
                
            if (recipe == null) return Result<Photo>.Failure("Recipe not found", 404);

            var uploadResult = await photoService.UploadPhoto(request.File);

            if (uploadResult == null) return Result<Photo>.Failure("Failed to upload photo", 400);

            var photo = new Photo
            {
                Url = uploadResult.Url,
                PublicId = uploadResult.PublicId,
                RecipeId = recipe.Id
            };
            recipe.ImageUrl = photo.Url;

            context.Photos.Add(photo);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            return result
                ? Result<Photo>.Success(photo)
                : Result<Photo>.Failure("Problem saving photo to DB", 400);
        }
    }
}
