using System;
using chatspy.Data;
using chatspy.Models;
using chatspy.Utils;
using Microsoft.EntityFrameworkCore.Migrations.Operations;

namespace chatspy.TypeSchema;

public class Mutation
{
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

    public async Task<User> UpdateUser(
        [Service] ChatspyContext dbContext,
        string Username,
        string FullName,
        string Email,
        string ProfilePicture
    )
    {
        var dbUser = dbContext.Users.Single(b => b.Username == Username);
        dbUser.Email = Email;
        dbUser.ProfilePicture = ProfilePicture;
        dbUser.FullName = FullName;
        await dbContext.SaveChangesAsync();

        // List<Workspace> userWorkspaces = [];

        // var Workspaces = User.Workspaces.ToList();

        // Workspaces.ForEach(b =>
        //     userWorkspaces.Add(
        //         new Workspace
        //         {
        //             Id = b.Id,
        //             Name = b.Name,
        //             CreatedBy = b.createdBy,
        //         }
        //     )
        // );

        var user = new User
        {
            Username = dbUser.Username,
            FullName = dbUser.FullName,
            Email = dbUser.Email,
            ProfilePicture = dbUser.ProfilePicture,
            // Workspaces = userWorkspaces,
        };
        return user;
    }
}
