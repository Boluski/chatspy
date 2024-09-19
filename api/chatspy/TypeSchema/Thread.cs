using System;
using chatspy.Data;
using Microsoft.EntityFrameworkCore;

namespace chatspy.TypeSchema;

public class Thread
{
    public Guid Id { get; set; }
    public string Text { get; set; }
    public DateTime Date { get; set; }

    public async Task<User> User(ChatspyContext dbContext)
    {
        var dbThread = await dbContext
            .Threads.Include(dbT => dbT.User)
            .SingleAsync(t => t.Id == Id);

        var user = new User
        {
            Username = dbThread.User.Username,
            Email = dbThread.User.Email,
            FullName = dbThread.User.FullName,
            ProfilePicture = dbThread.User.ProfilePicture,
        };

        return user;
    }
}
