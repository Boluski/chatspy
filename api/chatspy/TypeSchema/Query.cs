using System;
using chatspy.Data;
using chatspy.Models;

namespace chatspy.TypeSchema;

public class Query
{
    public User GetUser([Service] ChatspyContext dbContext)
    {
        // UserModel firstUser = new UserModel
        // {
        //     Username = "boluski",
        //     Email = "ajibols96@gmail.com",
        //     FullName = "Boluwatife Ajibola",
        //     ProfilePicture = "some url",
        // };
        // dbContext.Users.Add(firstUser);

        // UserModel myUser = dbContext.Users.Single(b => b.Username == "boluski");
        // WorkspaceModel firstWorkspace = new WorkspaceModel
        // {
        //     Name = "Spellblaze2",
        //     createdBy = myUser.Username,
        // };

        // firstWorkspace.Users.Add(myUser);

        // dbContext.Workspaces.Add(firstWorkspace);
        // dbContext.SaveChanges();
        return new User
        {
            Username = "boluski",
            FullName = "Boluwatife Ajibola",
            Email = "ajibols96@gmail.com",
            ProfilePicture = "www.ww.com",
            Workspaces = new List<Workspace>
            {
                new Workspace { Name = "Spellblaze" },
                new Workspace { Name = "Todo-fy" },
                new Workspace { Name = "chatspy" },
            },
        };
    }
}
