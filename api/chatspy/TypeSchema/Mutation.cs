using System;
using chatspy.Data;
using chatspy.Models;
using chatspy.Utils;
using Microsoft.EntityFrameworkCore.Migrations.Operations;

namespace chatspy.TypeSchema;

public class Mutation
{
    [UseMutationConvention]
    public async Task<User> CreateUser(
        [Service] ChatspyContext dbContext,
        string FullName,
        string Email,
        string ProfilePicture
    )
    {
        UserModel NewDbUser =
            new()
            {
                Username = Generate.GenerateUserName(FullName),
                FullName = FullName,
                Email = Email,
                ProfilePicture = ProfilePicture,
            };

        dbContext.Users.Add(NewDbUser);
        await dbContext.SaveChangesAsync();

        return new User
        {
            Username = NewDbUser.Username,
            FullName = NewDbUser.FullName,
            Email = NewDbUser.Email,
            ProfilePicture = NewDbUser.ProfilePicture,
        };
    }

    [UseMutationConvention]
    public async Task<User?> UpdateUser(
        [Service] ChatspyContext dbContext,
        [ID] string Username,
        string? FullName,
        string? Email,
        string? ProfilePicture
    )
    {
        var dbUser = dbContext.Users.Single(b => b.Username == Username);
        dbUser.Email = Email ?? dbUser.Email;
        dbUser.ProfilePicture = ProfilePicture ?? dbUser.ProfilePicture;
        dbUser.FullName = FullName ?? dbUser.FullName;
        await dbContext.SaveChangesAsync();

        var user = new User
        {
            Username = dbUser.Username,
            FullName = dbUser.FullName,
            Email = dbUser.Email,
            ProfilePicture = dbUser.ProfilePicture,
        };
        return user;
    }
}
