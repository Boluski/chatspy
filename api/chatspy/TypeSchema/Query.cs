using System;

namespace chatspy.TypeSchema;

public class Query
{
    public User GetUser() =>
         new User {
            username = "boluski",
            fullName = "Boluwatife Ajibola",
            email = "ajibols96@gmail.com",
            profilePicture = "www.ww.com",
            workspaces = new List<Workspace> {
                new Workspace {
                    Name = "Spellblaze",
                },
                new Workspace {
                    Name = "Todo-fy",
                },
                new Workspace {
                    Name = "chatspy",
                }
            }
        };
}
