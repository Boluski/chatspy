using chatspy.Data;
using Microsoft.EntityFrameworkCore;

namespace chatspy.TypeSchema;

public class Query
{
    [GraphQLDescription("Returns a user based on a username")]
    public async Task<User> GetUserByUsername(ChatspyContext dbContext, string username)
    {
        var dbUser = await dbContext.Users.SingleAsync(u => u.Username == username);
        var user = new User
        {
            Username = dbUser.Username,
            FullName = dbUser.FullName,
            Email = dbUser.Email,
            ProfilePicture = dbUser.ProfilePicture,
        };
        return user;
    }

    [GraphQLDescription("Returns a user based on an email")]
    public async Task<User> GetUserByEmail(ChatspyContext dbContext, string email)
    {
        var dbUser = await dbContext.Users.SingleAsync(u => u.Email == email);
        var user = new User
        {
            Username = dbUser.Username,
            FullName = dbUser.FullName,
            Email = dbUser.Email,
            ProfilePicture = dbUser.ProfilePicture,
        };
        return user;
    }

    [GraphQLDescription("Returns a workspace based on an it's id and username")]
    public async Task<Workspace> GetWorkspaceByID(
        ChatspyContext dbContext,
        Guid workspaceID,
        string username
    )
    {
        var dbWorkspace = await dbContext.Workspaces.SingleAsync(w => w.Id == workspaceID);
        var workspace = new Workspace
        {
            Id = dbWorkspace.Id,
            CreatedBy = dbWorkspace.CreatedBy,
            Name = dbWorkspace.Name,
            ChannelsFilterUsername = username,
        };
        return workspace;
    }

    [GraphQLDescription("Returns up to ten messages based on the channelId and cursor.")]
    [UsePaging(MaxPageSize = 10)]
    public async Task<IEnumerable<Message>> GetChannelMessages(
        ChatspyContext dbContext,
        Guid channelId
    )
    {
        var dbMessages = await dbContext
            .Messages.Where(m => m.Channel.Id == channelId)
            .ToListAsync();

        var messages = dbMessages
            .Select(m => new Message
            {
                Id = m.Id,
                Text = m.Text,
                Date = m.Date,
            })
            .ToList();
        return messages;
    }
}
