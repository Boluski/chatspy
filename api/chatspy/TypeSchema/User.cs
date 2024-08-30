using System;

namespace chatspy.TypeSchema;

public class User
{
    public string Username { get; set; }
    public string FullName { get; set; }
    public string Email { get; set; }
    public string ProfilePicture { get; set; }
    public List<Workspace> Workspaces { get; set; }
}
