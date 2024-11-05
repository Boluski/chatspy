using chatspy.Data;
using Microsoft.EntityFrameworkCore;

namespace chatspy.TypeSchema;

public class Message
{
    public Guid Id { get; set; }
    public string Text { get; set; }
    public DateTime Date { get; set; }

    [GraphQLIgnore]
    public string? Username { get; set; }

    public async Task<User> User(ChatspyContext dbContext)
    {
        // Specifically using the Username variable to get the user instead for Id
        // So as to avoid the Sequence contains more than one element error that is thrown.
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
        var dbThreads = await dbContext
            .Threads.Include(th => th.User)
            .Where(th => th.Message.Id == Id)
            .OrderBy(th => th.Date)
            .ToListAsync();

        var threads = dbThreads
            .Select(t => new Thread
            {
                Id = t.Id,
                Text = t.Text,
                Date = t.Date,
                Username = t.User.Username,
            })
            .ToList();

        return threads;
    }
}
