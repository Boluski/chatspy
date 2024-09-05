using System;

namespace chatspy.Models;

public class WorkspaceModel
{
    public Guid Id { get; set; }
    public string Name { get; set; }

    public string createdBy { get; set; }

    public List<UserModel> Users { get; } = [];
}
