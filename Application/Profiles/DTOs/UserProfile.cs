using System;

namespace Application.Profiles.DTOs;

public class UserProfile
{
    public required string Id { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
}
