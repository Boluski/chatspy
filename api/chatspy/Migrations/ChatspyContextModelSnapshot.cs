﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using chatspy.Data;

#nullable disable

namespace chatspy.Migrations
{
    [DbContext(typeof(ChatspyContext))]
    partial class ChatspyContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            MySqlModelBuilderExtensions.AutoIncrementColumns(modelBuilder);

            modelBuilder.Entity("ChannelModelUserModel", b =>
                {
                    b.Property<Guid>("ChannelsId")
                        .HasColumnType("char(36)");

                    b.Property<string>("UsersUsername")
                        .HasColumnType("varchar(255)");

                    b.HasKey("ChannelsId", "UsersUsername");

                    b.HasIndex("UsersUsername");

                    b.ToTable("ChannelModelUserModel");
                });

            modelBuilder.Entity("UserModelWorkspaceModel", b =>
                {
                    b.Property<string>("UsersUsername")
                        .HasColumnType("varchar(255)");

                    b.Property<Guid>("WorkspacesId")
                        .HasColumnType("char(36)");

                    b.HasKey("UsersUsername", "WorkspacesId");

                    b.HasIndex("WorkspacesId");

                    b.ToTable("UserModelWorkspaceModel");
                });

            modelBuilder.Entity("chatspy.Models.ChannelModel", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.Property<Guid>("WorkspaceId")
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.HasIndex("WorkspaceId");

                    b.ToTable("Channels");
                });

            modelBuilder.Entity("chatspy.Models.MessageModel", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<Guid>("ChannelId")
                        .HasColumnType("char(36)");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("ChannelId");

                    b.HasIndex("Username");

                    b.ToTable("Messages");
                });

            modelBuilder.Entity("chatspy.Models.ThreadModel", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime(6)");

                    b.Property<Guid>("MessageId")
                        .HasColumnType("char(36)");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("MessageId");

                    b.HasIndex("Username");

                    b.ToTable("Threads");
                });

            modelBuilder.Entity("chatspy.Models.UserModel", b =>
                {
                    b.Property<string>("Username")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("ProfilePicture")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Username");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.ToTable("Users");
                });

            modelBuilder.Entity("chatspy.Models.WorkspaceModel", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("CreatedBy")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Workspaces");
                });

            modelBuilder.Entity("ChannelModelUserModel", b =>
                {
                    b.HasOne("chatspy.Models.ChannelModel", null)
                        .WithMany()
                        .HasForeignKey("ChannelsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("chatspy.Models.UserModel", null)
                        .WithMany()
                        .HasForeignKey("UsersUsername")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("UserModelWorkspaceModel", b =>
                {
                    b.HasOne("chatspy.Models.UserModel", null)
                        .WithMany()
                        .HasForeignKey("UsersUsername")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("chatspy.Models.WorkspaceModel", null)
                        .WithMany()
                        .HasForeignKey("WorkspacesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("chatspy.Models.ChannelModel", b =>
                {
                    b.HasOne("chatspy.Models.WorkspaceModel", "Workspace")
                        .WithMany("Channels")
                        .HasForeignKey("WorkspaceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Workspace");
                });

            modelBuilder.Entity("chatspy.Models.MessageModel", b =>
                {
                    b.HasOne("chatspy.Models.ChannelModel", "Channel")
                        .WithMany("Messages")
                        .HasForeignKey("ChannelId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("chatspy.Models.UserModel", "User")
                        .WithMany()
                        .HasForeignKey("Username")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Channel");

                    b.Navigation("User");
                });

            modelBuilder.Entity("chatspy.Models.ThreadModel", b =>
                {
                    b.HasOne("chatspy.Models.MessageModel", "Message")
                        .WithMany("Threads")
                        .HasForeignKey("MessageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("chatspy.Models.UserModel", "User")
                        .WithMany()
                        .HasForeignKey("Username")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Message");

                    b.Navigation("User");
                });

            modelBuilder.Entity("chatspy.Models.ChannelModel", b =>
                {
                    b.Navigation("Messages");
                });

            modelBuilder.Entity("chatspy.Models.MessageModel", b =>
                {
                    b.Navigation("Threads");
                });

            modelBuilder.Entity("chatspy.Models.WorkspaceModel", b =>
                {
                    b.Navigation("Channels");
                });
#pragma warning restore 612, 618
        }
    }
}
