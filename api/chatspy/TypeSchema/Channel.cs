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
        var dbChannel = await dbContext
            .Channels.Include(c => c.Workspace.Users)
            .Include(c => c.Users)
            .SingleAsync(c => c.Id == Id);

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

    public List<Message> Messages(ChatspyContext dbContext)
    {
        var dbMessage = dbContext
            .Messages.Include(m => m.User)
            .Where(m => m.Channel.Id == Id)
            .OrderBy(m => m.Date)
            .ToList();

        var Message = dbMessage
            .Select(m => new Message
            {
                Id = m.Id,
                Date = m.Date,
                Text = m.Text,
                Username = m.User.Username,
            })
            .ToList();
        return Message;
    }
}

public enum ChannelType
{
    Public,
    Private,
    Direct,
}
