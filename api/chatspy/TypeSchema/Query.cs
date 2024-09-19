using System;
using chatspy.Data;
using chatspy.Models;
using Microsoft.EntityFrameworkCore;

namespace chatspy.TypeSchema;

public class Query
{
    [GraphQLDescription("Returns all the users.")]
    public async Task<List<User>> GetUsers(ChatspyContext dbContext)
    {
        var dbUsers = await dbContext.Users.ToListAsync();
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

    // [GraphQLDescription("Returns all the workspaces.")]
    // public async Task<List<Workspace>> GetWorkspaces(ChatspyContext dbContext)
    // {
    //     List<WorkspaceModel> dbWorkspaces = await dbContext.Workspaces.ToListAsync();

    //     List<Workspace> Workspaces = dbWorkspaces
    //         .Select(dbWorkspace => new Workspace
    //         {
    //             Id = dbWorkspace.Id,
    //             Name = dbWorkspace.Name,
    //             CreatedBy = dbWorkspace.CreatedBy,
    //         })
    //         .ToList();

    //     return Workspaces;
    // }

    // [GraphQLDescription("Returns all the channels.")]
    // public async Task<List<Channel>> GetChannels(ChatspyContext dbContext)
    // {
    //     List<ChannelModel> dbChannels = await dbContext.Channels.ToListAsync();

    //     List<Channel> Channels = dbChannels
    //         .Select(dbChannel => new Channel
    //         {
    //             Id = dbChannel.Id,
    //             Name = dbChannel.Name,
    //             Type = (ChannelType)dbChannel.Type,
    //         })
    //         .ToList();
    //     return Channels;
    // }

    // public async Task<List<Message>> GetMessages(ChatspyContext dbContext)
    // {
    //     var dbMessages = await dbContext.Messages.Include(m => m.User).ToListAsync();

    //     var messages = dbMessages
    //         .Select(dbMessage => new Message
    //         {
    //             Id = dbMessage.Id,
    //             Text = dbMessage.Text,
    //             Date = dbMessage.Date,
    //         })
    //         .ToList();
    //     return messages;
    // }
}
