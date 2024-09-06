using System;
using chatspy.Data;
using chatspy.Models;
using Microsoft.EntityFrameworkCore.Migrations.Operations;

namespace chatspy.TypeSchema;

public class Mutation
{
    public async Task<User> CreateUser(
        [Service] ChatspyContext dbContext,
        string Username,
        string FullName,
        string Email,
        string ProfilePicture
    )
    {
        UserModel newUser =
            new()
            {
                Username = Username,
                FullName = FullName,
                Email = Email,
                ProfilePicture = ProfilePicture,
            };
        dbContext.Users.Add(newUser);
        await dbContext.SaveChangesAsync();

        return new User
        {
            Username = Username,
            FullName = FullName,
            Email = Email,
            ProfilePicture = ProfilePicture,
        };
    }
}
