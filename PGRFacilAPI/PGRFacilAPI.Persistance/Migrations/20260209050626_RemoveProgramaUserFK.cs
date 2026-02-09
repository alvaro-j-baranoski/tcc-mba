using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PGRFacilAPI.Persistance.Migrations
{
    /// <inheritdoc />
    public partial class RemoveProgramaUserFK : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Programas_AspNetUsers_UsuarioID",
                table: "Programas");

            migrationBuilder.RenameColumn(
                name: "UsuarioID",
                table: "Programas",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Programas_UsuarioID",
                table: "Programas",
                newName: "IX_Programas_UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Programas_AspNetUsers_UserId",
                table: "Programas",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Programas_AspNetUsers_UserId",
                table: "Programas");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Programas",
                newName: "UsuarioID");

            migrationBuilder.RenameIndex(
                name: "IX_Programas_UserId",
                table: "Programas",
                newName: "IX_Programas_UsuarioID");

            migrationBuilder.AddForeignKey(
                name: "FK_Programas_AspNetUsers_UsuarioID",
                table: "Programas",
                column: "UsuarioID",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
