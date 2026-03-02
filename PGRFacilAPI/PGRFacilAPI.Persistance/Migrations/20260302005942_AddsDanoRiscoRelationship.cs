using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PGRFacilAPI.Persistance.Migrations
{
    /// <inheritdoc />
    public partial class AddsDanoRiscoRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Danos",
                table: "Riscos");

            migrationBuilder.CreateTable(
                name: "RiscoDanos",
                columns: table => new
                {
                    RiscoId = table.Column<Guid>(type: "uuid", nullable: false),
                    DanoId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RiscoDanos", x => new { x.RiscoId, x.DanoId });
                    table.ForeignKey(
                        name: "FK_RiscoDanos_Danos_DanoId",
                        column: x => x.DanoId,
                        principalTable: "Danos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RiscoDanos_Riscos_RiscoId",
                        column: x => x.RiscoId,
                        principalTable: "Riscos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RiscoDanos_DanoId",
                table: "RiscoDanos",
                column: "DanoId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RiscoDanos");

            migrationBuilder.AddColumn<string>(
                name: "Danos",
                table: "Riscos",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
