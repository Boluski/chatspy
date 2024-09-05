using System;

namespace chatspy.Models;

public class MessageModel
{
    public Guid Id { get; set; }
    public string Text { get; set; }
    public DateTime Date { get; set; }
    public ICollection<ThreadModel> Threads { get; } = [];
}
