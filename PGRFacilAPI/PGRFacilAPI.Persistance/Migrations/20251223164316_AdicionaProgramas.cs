using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PGRFacilAPI.Persistance.Migrations
{
    /// <inheritdoc />
    public partial class AdicionaProgramas : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ProgramaID",
                table: "Riscos",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Programas",
                columns: table => new
                {
                    Guid = table.Column<Guid>(type: "uuid", nullable: false),
                    Nome = table.Column<string>(type: "text", nullable: false),
                    DataDeCriacao = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UsuarioID = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Programas", x => x.Guid);
                    table.ForeignKey(
                        name: "FK_Programas_AspNetUsers_UsuarioID",
                        column: x => x.UsuarioID,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Riscos_ProgramaID",
                table: "Riscos",
                column: "ProgramaID");

            migrationBuilder.CreateIndex(
                name: "IX_Programas_UsuarioID",
                table: "Programas",
                column: "UsuarioID");

            migrationBuilder.AddForeignKey(
                name: "FK_Riscos_Programas_ProgramaID",
                table: "Riscos",
                column: "ProgramaID",
                principalTable: "Programas",
                principalColumn: "Guid",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Riscos_Programas_ProgramaID",
                table: "Riscos");

            migrationBuilder.DropTable(
                name: "Programas");

            migrationBuilder.DropIndex(
                name: "IX_Riscos_ProgramaID",
                table: "Riscos");

            migrationBuilder.DropColumn(
                name: "ProgramaID",
                table: "Riscos");
        }
    }
}
