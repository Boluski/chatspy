using System;
using chatspy.Data;
using chatspy.Models;
using chatspy.Utils;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using Microsoft.Extensions.Configuration.UserSecrets;

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

    [UseMutationConvention]
    public async Task<User?> DeleteUser([Service] ChatspyContext dbContext, [ID] string Username)
    {
        var dbUser = dbContext.Users.Single(dbUser => dbUser.Username == Username);
        dbContext.Remove(dbUser);
        await dbContext.SaveChangesAsync();

        User user =
            new()
            {
                Username = dbUser.Username,
                Email = dbUser.Email,
                ProfilePicture = dbUser.ProfilePicture,
                FullName = dbUser.FullName,
            };

        return user;
    }

    [UseMutationConvention]
    public async Task<Workspace> CreateWorkspace(
        [Service] ChatspyContext dbContext,
        string Username,
        string name
    )
    {
        var dbUser = dbContext.Users.Single(dbUser => dbUser.Username == Username);
        WorkspaceModel dbWorkspace = new() { Name = name, createdBy = dbUser.Username };
        dbWorkspace.Users.Add(dbUser);
        dbContext.Workspaces.Add(dbWorkspace);
        await dbContext.SaveChangesAsync();

        Workspace workspace =
            new()
            {
                Id = dbWorkspace.Id,
                Name = dbWorkspace.Name,
                CreatedBy = dbWorkspace.createdBy,
            };

        return workspace;
    }
}
