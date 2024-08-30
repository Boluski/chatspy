using System;
using chatspy.Models;
using Microsoft.EntityFrameworkCore;

namespace chatspy.Data;

public class ChatspyContext : DbContext
{
    public DbSet<WorkspaceModel> Workspaces { get; set; }

    // public DbSet<UserModel> Users { get; set; }

    public ChatspyContext(DbContextOptions<ChatspyContext> options)
        : base(options) { }
}
