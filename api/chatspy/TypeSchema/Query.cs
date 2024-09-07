using System;
using chatspy.Data;
using chatspy.Models;
using Microsoft.EntityFrameworkCore;

namespace chatspy.TypeSchema;

public class Query
{
    public async Task<List<User>> GetUsers(ChatspyContext dbContext)
    {
        var dbUsers = await dbContext.Users.Include(u => u.Workspaces).ToListAsync();
        List<User> Users = dbUsers
            .Select(dbUser =>
            {
                var u = new User
                {
                    Username = dbUser.Username,
                    Email = dbUser.Email,
                    ProfilePicture = dbUser.ProfilePicture,
                    FullName = dbUser.FullName,
                };

                return u;
            })
            .ToList();

        return Users;
    }

    public List<Workspace> GetWorkspaces(ChatspyContext dbContext)
    {
        List<WorkspaceModel> dbWorkspaces = dbContext.Workspaces.Include(w => w.Users).ToList();

        List<Workspace> Workspaces = dbWorkspaces
            .Select(dbWorkspace => new Workspace
            {
                Id = dbWorkspace.Id,
                Name = dbWorkspace.Name,
                CreatedBy = dbWorkspace.createdBy,
                Users = dbWorkspace
                    .Users.Select(u => new User
                    {
                        Username = u.Username,
                        Email = u.Email,
                        FullName = u.FullName,
                        ProfilePicture = u.ProfilePicture,
                    })
                    .ToList(),
            })
            .ToList();

        return Workspaces;
    }
}
