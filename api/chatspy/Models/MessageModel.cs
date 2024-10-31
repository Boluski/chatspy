namespace chatspy.Models;

public class MessageModel
{
    public Guid Id { get; set; }
    public string Text { get; set; }
    public DateTime Date { get; set; }
    public ChannelModel Channel { get; set; } = null!;
    public UserModel User { get; set; } = null!;
    public ICollection<ThreadModel> Threads { get; } = [];
}
