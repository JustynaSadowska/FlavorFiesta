using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security
{
    public class UserAccessor(IHttpContextAccessor httpContextAccessor, AppDbContext dbContext) : IUserAccessor
    {
        public async Task<User?> GetUserAsync()
        {
            var userId = GetUserId();
            if (string.IsNullOrEmpty(userId))
                return null; // brak zalogowanego usera

             return await dbContext.Users.FindAsync(userId);
        }

        public string? GetUserId()
        {
           return httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
        }

        public async Task<User?> GetUserWithPhotosAsync()
        {
            var userId = GetUserId();
        if (string.IsNullOrEmpty(userId))
            return null; // brak zalogowanego usera

        return await dbContext.Users
            .Include(x => x.Photos)
            .FirstOrDefaultAsync(x => x.Id == userId);
        }
    }
}