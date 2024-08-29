using System;

namespace chatspy.TypeSchema;

public class Workspace
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string createdBy { get; set; }
    public List<User> Users { get; set; }

    public List<Channel> Channels{ get; set; }
}
