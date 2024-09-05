using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace chatspy.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Workspaces_WorkspaceModelId",
                table: "Users");

            migrationBuilder.DropForeignKey(
                name: "FK_Workspaces_Users_createdByUsername",
                table: "Workspaces");

            migrationBuilder.DropIndex(
                name: "IX_Workspaces_createdByUsername",
                table: "Workspaces");

            migrationBuilder.DropIndex(
                name: "IX_Users_WorkspaceModelId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "createdByUsername",
                table: "Workspaces");

            migrationBuilder.DropColumn(
                name: "WorkspaceModelId",
                table: "Users");

            migrationBuilder.CreateTable(
                name: "UserModelWorkspaceModel",
                columns: table => new
                {
                    UsersUsername = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    WorkspacesId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserModelWorkspaceModel", x => new { x.UsersUsername, x.WorkspacesId });
                    table.ForeignKey(
                        name: "FK_UserModelWorkspaceModel_Users_UsersUsername",
                        column: x => x.UsersUsername,
                        principalTable: "Users",
                        principalColumn: "Username",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserModelWorkspaceModel_Workspaces_WorkspacesId",
                        column: x => x.WorkspacesId,
                        principalTable: "Workspaces",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_UserModelWorkspaceModel_WorkspacesId",
                table: "UserModelWorkspaceModel",
                column: "WorkspacesId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserModelWorkspaceModel");

            migrationBuilder.AddColumn<string>(
                name: "createdByUsername",
                table: "Workspaces",
                type: "varchar(255)",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<Guid>(
                name: "WorkspaceModelId",
                table: "Users",
                type: "char(36)",
                nullable: true,
                collation: "ascii_general_ci");

            migrationBuilder.CreateIndex(
                name: "IX_Workspaces_createdByUsername",
                table: "Workspaces",
                column: "createdByUsername");

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

            migrationBuilder.AddForeignKey(
                name: "FK_Workspaces_Users_createdByUsername",
                table: "Workspaces",
                column: "createdByUsername",
                principalTable: "Users",
                principalColumn: "Username");
        }
    }
}
