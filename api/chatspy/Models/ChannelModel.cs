using System;

namespace chatspy.Models;

public class ChannelModel
{
    public Guid Id { get; set; }
    public ChannelType Type { get; set; }
    public string ChannelName { get; set; }
    public ICollection<UserModel> Users { get; } = [];
    public ICollection<MessageModel> Messages { get; } = [];
}

public enum ChannelType
{
    Public,
    Private,
    Direct,
}
