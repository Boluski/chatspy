using System;
using chatspy.Data;
using chatspy.Models;
using chatspy.Utils;
using HotChocolate.Subscriptions;
using Microsoft.EntityFrameworkCore;

namespace chatspy.TypeSchema;

public class Mutation
{
    [GraphQLDescription("Creates a new user and generates the username.")]
    public async Task<User?> CreateUser(
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

        try
        {
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
        catch (System.Exception)
        {
            return null;
        }
    }

    [GraphQLDescription("Updates a user's meta data based on the username.")]
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

    [GraphQLDescription("Deletes a user based on the username.")]
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

    [GraphQLDescription("Creates a new workspace and generates the guid.")]
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

    [GraphQLDescription("Updates the workspace name or/and the createdBy fields with its Id.")]
    public async Task<Workspace?> UpdateWorkspace(
        ChatspyContext dbContext,
        [ID] Guid Id,
        string? name,
        string? createdBy
    )
    {
        var dbWorkspace = await dbContext.Workspaces.SingleAsync(w => w.Id == Id);
        dbWorkspace.Name = name ?? dbWorkspace.Name;
        dbWorkspace.CreatedBy = createdBy ?? dbWorkspace.CreatedBy;
        await dbContext.SaveChangesAsync();

        var workspace = new Workspace
        {
            Id = dbWorkspace.Id,
            Name = dbWorkspace.Name,
            CreatedBy = dbWorkspace.CreatedBy,
        };

        return workspace;
    }

    [GraphQLDescription("Deletes a workspace based on its ID.")]
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

    [GraphQLDescription("Adds a user to a workspace based on the workspaceId and the username.")]
    public async Task<Workspace?> AddUserToWorkspace(
        ChatspyContext dbContext,
        Guid workspaceID,
        string email
    )
    {
        try
        {
            var dbWorkspace = await dbContext.Workspaces.SingleAsync(w => w.Id == workspaceID);
            var dbUser = await dbContext.Users.SingleAsync(u => u.Email == email);
            dbWorkspace.Users.Add(dbUser);
            await dbContext.SaveChangesAsync();

            var workspace = new Workspace
            {
                Id = dbWorkspace.Id,
                Name = dbWorkspace.Name,
                CreatedBy = dbWorkspace.CreatedBy,
            };
            return workspace;
        }
        catch (Exception)
        {
            return null;
        }
    }

    [GraphQLDescription(
        "Removes a user from a workspace based on the workspaceId and the username."
    )]
    public async Task<Workspace?> RemoveUserFromWorkspace(
        ChatspyContext dbContext,
        Guid workspaceID,
        string username
    )
    {
        var dbWorkspace = await dbContext
            .Workspaces.Include(w => w.Users)
            .SingleAsync(w => w.Id == workspaceID);
        var dbUser = await dbContext.Users.SingleAsync(u => u.Username == username);

        dbWorkspace.Users.Remove(dbUser);
        await dbContext.SaveChangesAsync();

        var workspace = new Workspace
        {
            Id = dbWorkspace.Id,
            Name = dbWorkspace.Name,
            CreatedBy = dbWorkspace.CreatedBy,
        };

        return workspace;
    }

    [GraphQLDescription(
        "Creates a new channel in a workspace based on the workspaceId and channel type."
    )]
    public async Task<Channel?> CreateChannel(
        ChatspyContext dbContext,
        Guid workspaceId,
        string name,
        ChannelType type,
        string? rootUsername,
        string? directUsername
    )
    {
        var dbWorkspace = await dbContext.Workspaces.SingleAsync(w => w.Id == workspaceId);
        var dbChannel = new ChannelModel
        {
            Name = name,
            Type = (int)type,
            Workspace = dbWorkspace,
        };
        if (rootUsername != null && type == ChannelType.Private)
        {
            var dbUser = await dbContext.Users.SingleAsync(u => u.Username == rootUsername);
            dbChannel.Users.Add(dbUser);
        }

        if (rootUsername != null && directUsername != null && type == ChannelType.Direct)
        {
            var dbRootUser = await dbContext.Users.SingleAsync(u => u.Username == rootUsername);
            var dbDirectUser = await dbContext.Users.SingleAsync(u => u.Username == directUsername);
            dbChannel.Users.Add(dbRootUser);
            dbChannel.Users.Add(dbDirectUser);
        }

        await dbContext.Channels.AddAsync(dbChannel);
        await dbContext.SaveChangesAsync();

        var Channel = new Channel
        {
            Id = dbChannel.Id,
            Name = dbChannel.Name,
            Type = (ChannelType)dbChannel.Type,
        };

        return Channel;
    }

    [GraphQLDescription(
        "Updates the name of a channel. This should be used only for public and private channels."
    )]
    public async Task<Channel?> UpdateChannelName(
        ChatspyContext dbContext,
        Guid channelId,
        string name
    )
    {
        var dbChannel = await dbContext.Channels.SingleAsync(c => c.Id == channelId);
        dbChannel.Name = name;
        await dbContext.SaveChangesAsync();

        var Channel = new Channel
        {
            Id = dbChannel.Id,
            Name = dbChannel.Name,
            Type = (ChannelType)dbChannel.Type,
        };

        return Channel;
    }

    [GraphQLDescription("Deletes a channel based on its Id.")]
    public async Task<Channel?> DeleteChannel(ChatspyContext dbContext, Guid channelId)
    {
        var dbChannel = await dbContext.Channels.SingleAsync(c => c.Id == channelId);
        dbContext.Channels.Remove(dbChannel);
        await dbContext.SaveChangesAsync();

        var Channel = new Channel
        {
            Id = dbChannel.Id,
            Name = dbChannel.Name,
            Type = (ChannelType)dbChannel.Type,
        };

        return Channel;
    }

    [GraphQLDescription(
        "Adds a user to a private channel based on the username and the channelId."
    )]
    public async Task<Channel?> AddUserToChannel(
        ChatspyContext dbContext,
        Guid privateChannelId,
        string username
    )
    {
        var dbUser = await dbContext.Users.SingleAsync(u => u.Username == username);
        var dbChannel = await dbContext.Channels.SingleAsync(c => c.Id == privateChannelId);
        dbChannel.Users.Add(dbUser);
        await dbContext.SaveChangesAsync();

        var Channel = new Channel
        {
            Id = dbChannel.Id,
            Name = dbChannel.Name,
            Type = (ChannelType)dbChannel.Type,
        };

        return Channel;
    }

    [GraphQLDescription("Creates a new message based on the username and channelId")]
    public async Task<Message> CreateMessage(
        [Service] ITopicEventSender sender,
        ChatspyContext dbContext,
        Guid channelId,
        string username,
        string text
    )
    {
        var dbChannel = await dbContext.Channels.SingleAsync(c => c.Id == channelId);
        var dbUser = await dbContext.Users.SingleAsync(u => u.Username == username);
        var dbMessage = new MessageModel
        {
            Text = text,
            Date = DateTime.Now,
            Channel = dbChannel,
            User = dbUser,
        };
        await dbContext.Messages.AddAsync(dbMessage);
        await dbContext.SaveChangesAsync();

        var Message = new Message
        {
            Id = dbMessage.Id,
            Date = dbMessage.Date,
            Text = dbMessage.Text,
            ChannelId = dbChannel.Id,
            Username = username,
        };
        await sender.SendAsync($"[LISTEN_FOR_MESSAGE]{Message.ChannelId}", Message);
        return Message;
    }

    [GraphQLDescription("Edits the message's text based on it's Id.")]
    public async Task<Message> EditMessage(
        [Service] ITopicEventSender sender,
        ChatspyContext dbContext,
        Guid messageId,
        string text
    )
    {
        var dbMessage = await dbContext.Messages.SingleAsync(m => m.Id == messageId);
        dbMessage.Text = text;
        await dbContext.SaveChangesAsync();

        var Message = new Message
        {
            Id = dbMessage.Id,
            Date = dbMessage.Date,
            Text = dbMessage.Text,
        };

        await sender.SendAsync($"[EDIT_MESSAGE]{Message.Id}", Message);
        return Message;
    }

    [GraphQLDescription("Deletes a message based on it's Id.")]
    public async Task<Message> DeleteMessage(
        [Service] ITopicEventSender sender,
        ChatspyContext dbContext,
        Guid messageId
    )
    {
        var dbMessage = await dbContext.Messages.SingleAsync(m => m.Id == messageId);
        dbContext.Remove(dbMessage);
        await dbContext.SaveChangesAsync();

        var Message = new Message
        {
            Id = dbMessage.Id,
            Date = dbMessage.Date,
            Text = dbMessage.Text,
        };

        await sender.SendAsync($"[DELETE_MESSAGE]{Message.Id}", Message);
        return Message;
    }

    [GraphQLDescription("Creates a new thread based on the username and messageId")]
    public async Task<Thread> CreateThread(
        [Service] ITopicEventSender sender,
        ChatspyContext dbContext,
        string username,
        Guid messageID,
        string text
    )
    {
        var dbMessage = await dbContext.Messages.SingleAsync(m => m.Id == messageID);
        var dbUser = await dbContext.Users.SingleAsync(u => u.Username == username);

        var dbThread = new ThreadModel
        {
            Text = text,
            Date = DateTime.Now,
            Message = dbMessage,
            User = dbUser,
        };
        await dbContext.Threads.AddAsync(dbThread);
        await dbContext.SaveChangesAsync();

        var Thread = new Thread
        {
            Id = dbThread.Id,
            Date = dbThread.Date,
            Text = dbThread.Text,
            MessageId = dbMessage.Id,
            Username = dbUser.Username,
        };
        await sender.SendAsync($"[CREATE_THREAD]{Thread.MessageId}", Thread);
        return Thread;
    }

    [GraphQLDescription("Edits the thread's text based on it's Id.")]
    public async Task<Thread> EditThread(
        [Service] ITopicEventSender sender,
        ChatspyContext dbContext,
        Guid threadId,
        string text
    )
    {
        var dbThread = await dbContext
            .Threads.Include(t => t.User)
            .Include(t => t.Message)
            .SingleAsync(t => t.Id == threadId);
        dbThread.Text = text;
        await dbContext.SaveChangesAsync();

        var Thread = new Thread
        {
            Id = dbThread.Id,
            Date = dbThread.Date,
            Text = dbThread.Text,
            MessageId = dbThread.Message.Id,
            Username = dbThread.User.Username,
        };
        await sender.SendAsync($"[EDIT_THREAD]{Thread.MessageId}", Thread);
        return Thread;
    }

    [GraphQLDescription("Deletes a thread based on it's Id.")]
    public async Task<Thread> DeleteThread(
        [Service] ITopicEventSender sender,
        ChatspyContext dbContext,
        Guid threadId
    )
    {
        var dbThread = await dbContext
            .Threads.Include(t => t.User)
            .Include(t => t.Message)
            .SingleAsync(t => t.Id == threadId);
        dbContext.Remove(dbThread);
        await dbContext.SaveChangesAsync();

        var Thread = new Thread
        {
            Id = dbThread.Id,
            Date = dbThread.Date,
            Text = dbThread.Text,
            MessageId = dbThread.Message.Id,
            Username = dbThread.User.Username,
        };
        await sender.SendAsync($"[DELETE_THREAD]{Thread.MessageId}", Thread);
        return Thread;
    }
}
