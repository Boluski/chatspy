using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace chatspy.Models;

[Index(nameof(Email), IsUnique = true)]
public class UserModel
{
    [Key]
    public string Username { get; set; }
    public string FullName { get; set; }
    public string Email { get; set; }
    public string ProfilePicture { get; set; }
    public List<WorkspaceModel> Workspaces { get; } = [];
    public List<ChannelModel> Channels { get; } = [];
}
