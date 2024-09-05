﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using chatspy.Data;

#nullable disable

namespace chatspy.Migrations
{
    [DbContext(typeof(ChatspyContext))]
    [Migration("20240905234938_createdThreeModel")]
    partial class createdThreeModel
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            MySqlModelBuilderExtensions.AutoIncrementColumns(modelBuilder);

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

                    b.Property<string>("ChannelName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.Property<Guid?>("WorkspaceModelId")
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.HasIndex("WorkspaceModelId");

                    b.ToTable("Channels");
                });

            modelBuilder.Entity("chatspy.Models.MessageModel", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<Guid?>("ChannelModelId")
                        .HasColumnType("char(36)");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("ChannelModelId");

                    b.ToTable("Messages");
                });

            modelBuilder.Entity("chatspy.Models.ThreadModel", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime(6)");

                    b.Property<Guid?>("MessageModelId")
                        .HasColumnType("char(36)");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("MessageModelId");

                    b.ToTable("Threads");
                });

            modelBuilder.Entity("chatspy.Models.UserModel", b =>
                {
                    b.Property<string>("Username")
                        .HasColumnType("varchar(255)");

                    b.Property<Guid?>("ChannelModelId")
                        .HasColumnType("char(36)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("ProfilePicture")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Username");

                    b.HasIndex("ChannelModelId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("chatspy.Models.WorkspaceModel", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("createdBy")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Workspaces");
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
                    b.HasOne("chatspy.Models.WorkspaceModel", null)
                        .WithMany("Channels")
                        .HasForeignKey("WorkspaceModelId");
                });

            modelBuilder.Entity("chatspy.Models.MessageModel", b =>
                {
                    b.HasOne("chatspy.Models.ChannelModel", null)
                        .WithMany("Messages")
                        .HasForeignKey("ChannelModelId");
                });

            modelBuilder.Entity("chatspy.Models.ThreadModel", b =>
                {
                    b.HasOne("chatspy.Models.MessageModel", null)
                        .WithMany("Threads")
                        .HasForeignKey("MessageModelId");
                });

            modelBuilder.Entity("chatspy.Models.UserModel", b =>
                {
                    b.HasOne("chatspy.Models.ChannelModel", null)
                        .WithMany("Users")
                        .HasForeignKey("ChannelModelId");
                });

            modelBuilder.Entity("chatspy.Models.ChannelModel", b =>
                {
                    b.Navigation("Messages");

                    b.Navigation("Users");
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
