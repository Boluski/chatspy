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
    [Migration("20240905220548_InitialCreate2")]
    partial class InitialCreate2
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            MySqlModelBuilderExtensions.AutoIncrementColumns(modelBuilder);

            modelBuilder.Entity("chatspy.Models.UserModel", b =>
                {
                    b.Property<string>("Username")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("ProfilePicture")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<Guid?>("WorkspaceModelId")
                        .HasColumnType("char(36)");

                    b.HasKey("Username");

                    b.HasIndex("WorkspaceModelId");

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

                    b.Property<string>("createdByUsername")
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("createdByUsername");

                    b.ToTable("Workspaces");
                });

            modelBuilder.Entity("chatspy.Models.UserModel", b =>
                {
                    b.HasOne("chatspy.Models.WorkspaceModel", null)
                        .WithMany("Users")
                        .HasForeignKey("WorkspaceModelId");
                });

            modelBuilder.Entity("chatspy.Models.WorkspaceModel", b =>
                {
                    b.HasOne("chatspy.Models.UserModel", "createdBy")
                        .WithMany()
                        .HasForeignKey("createdByUsername");

                    b.Navigation("createdBy");
                });

            modelBuilder.Entity("chatspy.Models.WorkspaceModel", b =>
                {
                    b.Navigation("Users");
                });
#pragma warning restore 612, 618
        }
    }
}
