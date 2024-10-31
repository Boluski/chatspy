namespace chatspy.Models;

public class ChannelModel
{
    public Guid Id { get; set; }
    public int Type { get; set; }
    public string Name { get; set; }
    public WorkspaceModel Workspace { get; set; } = null!;
    public List<UserModel> Users { get; } = [];
    public ICollection<MessageModel> Messages { get; } = [];
}
