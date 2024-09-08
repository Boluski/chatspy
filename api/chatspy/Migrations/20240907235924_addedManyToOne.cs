using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace chatspy.Migrations
{
    /// <inheritdoc />
    public partial class addedManyToOne : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Channels_Workspaces_WorkspaceModelId",
                table: "Channels");

            migrationBuilder.DropForeignKey(
                name: "FK_Messages_Channels_ChannelModelId",
                table: "Messages");

            migrationBuilder.DropForeignKey(
                name: "FK_Threads_Messages_MessageModelId",
                table: "Threads");

            migrationBuilder.DropIndex(
                name: "IX_Threads_MessageModelId",
                table: "Threads");

            migrationBuilder.DropIndex(
                name: "IX_Messages_ChannelModelId",
                table: "Messages");

            migrationBuilder.DropIndex(
                name: "IX_Channels_WorkspaceModelId",
                table: "Channels");

            migrationBuilder.DropColumn(
                name: "MessageModelId",
                table: "Threads");

            migrationBuilder.DropColumn(
                name: "ChannelModelId",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "WorkspaceModelId",
                table: "Channels");

            migrationBuilder.AddColumn<Guid>(
                name: "MessageId",
                table: "Threads",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                collation: "ascii_general_ci");

            migrationBuilder.AddColumn<Guid>(
                name: "ChannelId",
                table: "Messages",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                collation: "ascii_general_ci");

            migrationBuilder.AddColumn<Guid>(
                name: "WorkspaceId",
                table: "Channels",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                collation: "ascii_general_ci");

            migrationBuilder.CreateIndex(
                name: "IX_Threads_MessageId",
                table: "Threads",
                column: "MessageId");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_ChannelId",
                table: "Messages",
                column: "ChannelId");

            migrationBuilder.CreateIndex(
                name: "IX_Channels_WorkspaceId",
                table: "Channels",
                column: "WorkspaceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Channels_Workspaces_WorkspaceId",
                table: "Channels",
                column: "WorkspaceId",
                principalTable: "Workspaces",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_Channels_ChannelId",
                table: "Messages",
                column: "ChannelId",
                principalTable: "Channels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Threads_Messages_MessageId",
                table: "Threads",
                column: "MessageId",
                principalTable: "Messages",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Channels_Workspaces_WorkspaceId",
                table: "Channels");

            migrationBuilder.DropForeignKey(
                name: "FK_Messages_Channels_ChannelId",
                table: "Messages");

            migrationBuilder.DropForeignKey(
                name: "FK_Threads_Messages_MessageId",
                table: "Threads");

            migrationBuilder.DropIndex(
                name: "IX_Threads_MessageId",
                table: "Threads");

            migrationBuilder.DropIndex(
                name: "IX_Messages_ChannelId",
                table: "Messages");

            migrationBuilder.DropIndex(
                name: "IX_Channels_WorkspaceId",
                table: "Channels");

            migrationBuilder.DropColumn(
                name: "MessageId",
                table: "Threads");

            migrationBuilder.DropColumn(
                name: "ChannelId",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "WorkspaceId",
                table: "Channels");

            migrationBuilder.AddColumn<Guid>(
                name: "MessageModelId",
                table: "Threads",
                type: "char(36)",
                nullable: true,
                collation: "ascii_general_ci");

            migrationBuilder.AddColumn<Guid>(
                name: "ChannelModelId",
                table: "Messages",
                type: "char(36)",
                nullable: true,
                collation: "ascii_general_ci");

            migrationBuilder.AddColumn<Guid>(
                name: "WorkspaceModelId",
                table: "Channels",
                type: "char(36)",
                nullable: true,
                collation: "ascii_general_ci");

            migrationBuilder.CreateIndex(
                name: "IX_Threads_MessageModelId",
                table: "Threads",
                column: "MessageModelId");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_ChannelModelId",
                table: "Messages",
                column: "ChannelModelId");

            migrationBuilder.CreateIndex(
                name: "IX_Channels_WorkspaceModelId",
                table: "Channels",
                column: "WorkspaceModelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Channels_Workspaces_WorkspaceModelId",
                table: "Channels",
                column: "WorkspaceModelId",
                principalTable: "Workspaces",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_Channels_ChannelModelId",
                table: "Messages",
                column: "ChannelModelId",
                principalTable: "Channels",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Threads_Messages_MessageModelId",
                table: "Threads",
                column: "MessageModelId",
                principalTable: "Messages",
                principalColumn: "Id");
        }
    }
}
