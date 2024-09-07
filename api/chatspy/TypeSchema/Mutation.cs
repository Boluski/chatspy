using System;
using chatspy.Data;
using chatspy.Models;
using chatspy.Utils;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using Microsoft.Extensions.Configuration.UserSecrets;

namespace chatspy.TypeSchema;

public class Mutation
{
    // Creates a new user and generates the username.
    public async Task<User> CreateUser(
        ChatspyContext dbContext,
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

        await dbContext.Users.AddAsync(NewDbUser);
        await dbContext.SaveChangesAsync();

        return new User
        {
            Username = NewDbUser.Username,
            FullName = NewDbUser.FullName,
            Email = NewDbUser.Email,
            ProfilePicture = NewDbUser.ProfilePicture,
        };
    }

    // Updates a user's meta data based on the username.
    public async Task<User?> UpdateUser(
        ChatspyContext dbContext,
        [ID] string Username,
        string? FullName,
        string? Email,
        string? ProfilePicture
    )
    {
        var dbUser = await dbContext.Users.SingleAsync(b => b.Username == Username);
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

    // Deletes a user based on the username.
    public async Task<User?> DeleteUser(ChatspyContext dbContext, [ID] string Username)
    {
        var dbUser = await dbContext.Users.SingleAsync(dbUser => dbUser.Username == Username);
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

    // Creates a new workspace and generates the guid.
    public async Task<Workspace> CreateWorkspace(
        ChatspyContext dbContext,
        string Username,
        string name
    )
    {
        var dbUser = await dbContext.Users.SingleAsync(dbUser => dbUser.Username == Username);
        WorkspaceModel dbWorkspace = new() { Name = name, CreatedBy = dbUser.Username };
        dbWorkspace.Users.Add(dbUser);
        dbContext.Workspaces.Add(dbWorkspace);
        await dbContext.SaveChangesAsync();

        Workspace workspace =
            new()
            {
                Id = dbWorkspace.Id,
                Name = dbWorkspace.Name,
                CreatedBy = dbWorkspace.CreatedBy,
            };

        return workspace;
    }

    public async Task<Workspace?> DeleteWorkspace(ChatspyContext dbContext, [ID] Guid Id)
    {
        var dbWorkspace = await dbContext.Workspaces.SingleAsync(w => w.Id == Id);

        var workspace = new Workspace
        {
            Id = dbWorkspace.Id,
            Name = dbWorkspace.Name,
            CreatedBy = dbWorkspace.CreatedBy,
        };

        dbContext.Remove(dbWorkspace);
        await dbContext.SaveChangesAsync();
        return workspace;
    }
}
