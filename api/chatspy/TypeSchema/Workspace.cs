using System;
using chatspy.Data;
using Microsoft.EntityFrameworkCore;

namespace chatspy.TypeSchema;

public class Workspace
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string CreatedBy { get; set; }

    public async Task<List<User>> Users(ChatspyContext dbContext)
    {
        var dbWorkspaceUsers = await dbContext
            .Users.Where(u => u.Workspaces.Any(w => w.Id == Id))
            .ToListAsync();

        var Users = dbWorkspaceUsers
            .Select(u => new User
            {
                Username = u.Username,
                Email = u.Email,
                FullName = u.FullName,
                ProfilePicture = u.ProfilePicture,
            })
            .ToList();

        return Users;
    }

    public async Task<List<Channel>> Channels(ChatspyContext dbContext)
    {
        var dbWorkspaceChannels = await dbContext
            .Channels.Where(c => c.Workspace.Id == Id)
            .ToListAsync();

        var Channels = dbWorkspaceChannels
            .Select(c => new Channel
            {
                Id = c.Id,
                Name = c.Name,
                Type = (ChannelType)c.Type,
            })
            .ToList();
        return Channels;
    }
}
