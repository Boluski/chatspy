using System;

namespace chatspy.TypeSchema;

public class Workspace
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string CreatedBy { get; set; }
    public List<User> Users { get; set; }

    public List<Channel> Channels { get; set; }
}
