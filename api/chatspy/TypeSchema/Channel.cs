using chatspy.Data;
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
 
        var dbChannel = await dbContext
            .Channels.Include(c => c.Workspace.Users)
            .SingleOrDefaultAsync(c => c.Id == Id);

        var dbUsers = await dbContext
            .Users.Where((u) => u.Channels.Any(c => c.Id == Id))
            .ToListAsync();

        if (Type == ChannelType.Private)
        {
            // dbUsers = dbChannel.Users.ToList();
        }
        else if (Type == ChannelType.Direct)
        {
            // dbUsers = dbChannel.Users.ToList();
        }
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
