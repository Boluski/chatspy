using System;

namespace chatspy.TypeSchema;

public class Channel
{
    public string Id { get; set; }
    public string Name { get; set; }
    public ChannelType Type { get; set; }
    public List<User> PrivateUsers { get; set; }
    public List<Message> Messages { get; set; }
}

public enum ChannelType
{
    Public,
    Private,
    Direct,
}
