using System;
using chatspy.Data;

namespace chatspy.TypeSchema;

public class Thread
{
    public Guid Id { get; set; }
    public string Text { get; set; }
    public DateTime Date { get; set; }

    // public async Task<User> User(ChatspyContext dbContext)
    // {
    //     var dbMessage = await dbContext
    //         .Messages.Include(dbM => dbM.User)
    //         .SingleAsync(m => m.Id == Id);
    //     var user = new User
    //     {
    //         Username = dbMessage.User.Username,
    //         Email = dbMessage.User.Email,
    //         FullName = dbMessage.User.FullName,
    //         ProfilePicture = dbMessage.User.ProfilePicture,
    //     };

    //     return user;
    // }
}
