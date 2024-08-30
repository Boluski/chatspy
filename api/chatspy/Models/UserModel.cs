using System;
using System.ComponentModel.DataAnnotations;

namespace chatspy.Models;

public class UserModel
{
    [Key]
    public string Username { get; set; }
    public string FullName { get; set; }
    public string Email { get; set; }
    public string ProfilePicture { get; set; }
    // public List<WorkspaceModel> Workspaces { get; } = [];
}
