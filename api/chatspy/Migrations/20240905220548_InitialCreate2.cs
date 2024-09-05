using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace chatspy.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "WorkspaceModelId",
                table: "Users",
                type: "char(36)",
                nullable: true,
                collation: "ascii_general_ci");

            migrationBuilder.CreateIndex(
                name: "IX_Users_WorkspaceModelId",
                table: "Users",
                column: "WorkspaceModelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Workspaces_WorkspaceModelId",
                table: "Users",
                column: "WorkspaceModelId",
                principalTable: "Workspaces",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Workspaces_WorkspaceModelId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_WorkspaceModelId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "WorkspaceModelId",
                table: "Users");
        }
    }
}
