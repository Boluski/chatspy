using System;

namespace chatspy.TypeSchema;

public class User
{
    public string username { get; set;}
    public string fullName { get; set;}
    public string email { get; set;}
    public string profilePicture { get; set;}
    public List<Workspace> workspaces { get; set;}
}
