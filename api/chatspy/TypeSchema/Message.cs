using chatspy.Data;
using chatspy.Models;
using Microsoft.EntityFrameworkCore;

namespace chatspy.TypeSchema;

public class Message
{
    public Guid Id { get; set; }
    public string Text { get; set; }
    public DateTime Date { get; set; }

    // To make the subscription dynamic based on the channelId.
    [GraphQLIgnore]
    public Guid? ChannelId { get; set; }

    [GraphQLIgnore]
    public string? Username { get; set; }

    public async Task<User> User(ChatspyContext dbContext)
    {
        var dbUser = await dbContext.Users.SingleAsync(u => u.Username == Username);

        var user = new User
        {
            Username = dbUser.Username,
            Email = dbUser.Email,
            FullName = dbUser.FullName,
            ProfilePicture = dbUser.ProfilePicture,
        };

        return user;
    }

    public async Task<List<Thread>> Threads(ChatspyContext dbContext)
    {
        var dbThreads = await dbContext.Threads.Where(dbT => dbT.Message.Id == Id).ToListAsync();

        var threads = dbThreads
            .Select(t => new Thread
            {
                Id = t.Id,
                Text = t.Text,
                Date = t.Date,
            })
            .ToList();

        return threads;
    }
}
