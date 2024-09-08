using System;

namespace chatspy.TypeSchema;

public class Message
{
    public Guid Id { get; set; }
    public string Text { get; set; }
    public DateTime Date { get; set; }
    public User User { get; set; }
    public List<Thread> Threads { get; set; }
}
