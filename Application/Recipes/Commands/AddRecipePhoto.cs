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

            if (recipe.Photo != null)
            {
                await photoService.DeletePhoto(recipe.Photo.PublicId);
                context.Photos.Remove(recipe.Photo);
            }

            var uploadResult = await photoService.UploadPhoto(request.File);

            if (uploadResult == null) return Result<Photo>.Failure("Failed to upload photo", 400);

            var newPhoto = new Photo
            {
                Url = uploadResult.Url,
                PublicId = uploadResult.PublicId,
                RecipeId = recipe.Id
            };

            recipe.ImageUrl = newPhoto.Url;
            recipe.Photo = newPhoto;

            context.Photos.Add(newPhoto);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            return result
                ? Result<Photo>.Success(newPhoto)
                : Result<Photo>.Failure("Problem saving photo to DB", 400);
        }
    }
}
