using chatspy.Data;
using Microsoft.EntityFrameworkCore;

namespace chatspy.TypeSchema;

public class Message
{
    public Guid Id { get; set; }
    public string Text { get; set; }
    public DateTime Date { get; set; }

    public async Task<User> User(ChatspyContext dbContext)
    {
        var dbMessage = await dbContext
            .Messages.Include(dbM => dbM.User)
            .SingleAsync(m => m.Id == Id);
        var user = new User
        {
            Username = dbMessage.User.Username,
            Email = dbMessage.User.Email,
            FullName = dbMessage.User.FullName,
            ProfilePicture = dbMessage.User.ProfilePicture,
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
