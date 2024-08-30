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
                name: "FK_Workspaces_UserModel_Username1",
                table: "Workspaces");

            migrationBuilder.RenameColumn(
                name: "Username1",
                table: "Workspaces",
                newName: "createdByUsername");

            migrationBuilder.RenameIndex(
                name: "IX_Workspaces_Username1",
                table: "Workspaces",
                newName: "IX_Workspaces_createdByUsername");

            migrationBuilder.AddForeignKey(
                name: "FK_Workspaces_UserModel_createdByUsername",
                table: "Workspaces",
                column: "createdByUsername",
                principalTable: "UserModel",
                principalColumn: "Username",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Workspaces_UserModel_createdByUsername",
                table: "Workspaces");

            migrationBuilder.RenameColumn(
                name: "createdByUsername",
                table: "Workspaces",
                newName: "Username1");

            migrationBuilder.RenameIndex(
                name: "IX_Workspaces_createdByUsername",
                table: "Workspaces",
                newName: "IX_Workspaces_Username1");

            migrationBuilder.AddForeignKey(
                name: "FK_Workspaces_UserModel_Username1",
                table: "Workspaces",
                column: "Username1",
                principalTable: "UserModel",
                principalColumn: "Username",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
