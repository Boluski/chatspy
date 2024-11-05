using chatspy.Data;
using Microsoft.EntityFrameworkCore;

namespace chatspy.TypeSchema;

public class User
{
    public string Username { get; set; }
    public string FullName { get; set; }
    public string Email { get; set; }
    public string ProfilePicture { get; set; }

    public async Task<List<Workspace>> Workspaces(ChatspyContext dbContext)
    {
        var dbUserWorkspaces = await dbContext
            .Workspaces.Where(w => w.Users.Any(u => u.Username == Username))
            .ToListAsync();

        var Workspaces = dbUserWorkspaces
            .Select(w => new Workspace
            {
                Id = w.Id,
                Name = w.Name,
                CreatedBy = w.CreatedBy,
                ChannelsFilterUsername = Username,
            })
            .ToList();
        return Workspaces;
    }
}
