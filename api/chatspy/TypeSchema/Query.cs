using System;

namespace chatspy.TypeSchema;

public class Query
{
    public User GetUser() =>
        new User
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
