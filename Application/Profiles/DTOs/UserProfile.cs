using System;

namespace Application.Profiles.DTOs;

public class UserProfile
{
    public required string Id { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public string? ImageUrl { get; set; }
    public DateTime DateRegistered { get; set; }

    public bool Following { get; set; }
    public int FollowersCount { get; set; }
    public int FollowingCount { get; set; }
}
