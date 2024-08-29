using System;

namespace chatspy.TypeSchema;

public class Message
{
    public string Id { get; set; }
    public string Text { get; set; }
    public DateTime Date { get; set; }
    public List<Thread> Threads { get; set; }
}
