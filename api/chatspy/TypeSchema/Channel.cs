using System;
using chatspy.Data;
using chatspy.Models;
using Microsoft.EntityFrameworkCore;

namespace chatspy.TypeSchema;

public class Channel
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public ChannelType Type { get; set; }

    public async Task<List<User>> Users(ChatspyContext dbContext)
    {
        List<User> users;
        List<UserModel> dbUsers = null!;
        var dbChannel = await dbContext.Channels.SingleAsync(c => c.Id == Id);

        if (Type == ChannelType.Private)
        {
            dbUsers = dbChannel.Users.ToList();
        }
        else if (Type == ChannelType.Direct)
        {
            dbUsers = dbChannel.Users.ToList();
        }
        //Type == ChannelType.Public
        else
        {
            dbUsers = dbChannel.Workspace.Users.ToList();
        }

        users = dbUsers
            .Select(u => new User
            {
                Username = u.Username,
                FullName = u.FullName,
                Email = u.Email,
                ProfilePicture = u.ProfilePicture,
            })
            .ToList();
        return users;
    }

    public List<Message> Messages { get; set; }
}

public enum ChannelType
{
    Public,
    Private,
    Direct,
}
