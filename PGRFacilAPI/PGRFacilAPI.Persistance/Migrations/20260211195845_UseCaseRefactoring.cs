using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PGRFacilAPI.Persistance.Migrations
{
    /// <inheritdoc />
    public partial class UseCaseRefactoring : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Riscos_Programas_ProgramaID",
                table: "Riscos");

            migrationBuilder.DropTable(
                name: "Programas");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Riscos",
                table: "Riscos");

            migrationBuilder.DropIndex(
                name: "IX_Riscos_ProgramaID",
                table: "Riscos");

            migrationBuilder.DropColumn(
                name: "ProgramaID",
                table: "Riscos");

            migrationBuilder.RenameColumn(
                name: "AgentesDeRisco",
                table: "Riscos",
                newName: "Agentes");

            migrationBuilder.RenameColumn(
                name: "Guid",
                table: "Riscos",
                newName: "GheId");

            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "Riscos",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_Riscos",
                table: "Riscos",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Ghes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Nome = table.Column<string>(type: "text", nullable: false),
                    AtualizadoEm = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ghes", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Riscos_GheId",
                table: "Riscos",
                column: "GheId");

            migrationBuilder.AddForeignKey(
                name: "FK_Riscos_Ghes_GheId",
                table: "Riscos",
                column: "GheId",
                principalTable: "Ghes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Riscos_Ghes_GheId",
                table: "Riscos");

            migrationBuilder.DropTable(
                name: "Ghes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Riscos",
                table: "Riscos");

            migrationBuilder.DropIndex(
                name: "IX_Riscos_GheId",
                table: "Riscos");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Riscos");

            migrationBuilder.RenameColumn(
                name: "GheId",
                table: "Riscos",
                newName: "Guid");

            migrationBuilder.RenameColumn(
                name: "Agentes",
                table: "Riscos",
                newName: "AgentesDeRisco");

            migrationBuilder.AddColumn<Guid>(
                name: "ProgramaID",
                table: "Riscos",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Riscos",
                table: "Riscos",
                column: "Guid");

            migrationBuilder.CreateTable(
                name: "Programas",
                columns: table => new
                {
                    Guid = table.Column<Guid>(type: "uuid", nullable: false),
                    AtualizadoEm = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Nome = table.Column<string>(type: "text", nullable: false),
                    UserId = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Programas", x => x.Guid);
                    table.ForeignKey(
                        name: "FK_Programas_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Riscos_ProgramaID",
                table: "Riscos",
                column: "ProgramaID");

            migrationBuilder.CreateIndex(
                name: "IX_Programas_UserId",
                table: "Programas",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Riscos_Programas_ProgramaID",
                table: "Riscos",
                column: "ProgramaID",
                principalTable: "Programas",
                principalColumn: "Guid",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
