using System;
using chatspy.Data;
using chatspy.Models;

namespace chatspy.TypeSchema;

public class Query
{
    public List<User> GetUsers([Service] ChatspyContext dbContext)
    {
        var dbUsers = dbContext.Users.ToList();
        List<User> Users = dbUsers
            .Select(dbUser => new User
            {
                Username = dbUser.Username,
                Email = dbUser.Email,
                ProfilePicture = dbUser.ProfilePicture,
                FullName = dbUser.FullName,
            })
            .ToList();

        return Users;
    }
}
