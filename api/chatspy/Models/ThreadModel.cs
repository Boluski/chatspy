using System;

namespace chatspy.Models;

public class ThreadModel
{
    public Guid Id { get; set; }
    public string Text { get; set; }
    public DateTime Date { get; set; }

    public MessageModel Message { get; set; } = null!;
}
