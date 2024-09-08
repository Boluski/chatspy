using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace chatspy.Migrations
{
    /// <inheritdoc />
    public partial class addedUserToMessageAndThread : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Username",
                table: "Threads",
                type: "varchar(255)",
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "Username",
                table: "Messages",
                type: "varchar(255)",
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Threads_Username",
                table: "Threads",
                column: "Username");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_Username",
                table: "Messages",
                column: "Username");

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_Users_Username",
                table: "Messages",
                column: "Username",
                principalTable: "Users",
                principalColumn: "Username",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Threads_Users_Username",
                table: "Threads",
                column: "Username",
                principalTable: "Users",
                principalColumn: "Username",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Messages_Users_Username",
                table: "Messages");

            migrationBuilder.DropForeignKey(
                name: "FK_Threads_Users_Username",
                table: "Threads");

            migrationBuilder.DropIndex(
                name: "IX_Threads_Username",
                table: "Threads");

            migrationBuilder.DropIndex(
                name: "IX_Messages_Username",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "Username",
                table: "Threads");

            migrationBuilder.DropColumn(
                name: "Username",
                table: "Messages");
        }
    }
}
