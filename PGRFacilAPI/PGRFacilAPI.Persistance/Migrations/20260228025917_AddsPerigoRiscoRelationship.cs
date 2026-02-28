using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PGRFacilAPI.Persistance.Migrations
{
    /// <inheritdoc />
    public partial class AddsPerigoRiscoRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Perigos",
                table: "Riscos");

            migrationBuilder.CreateTable(
                name: "RiscoPerigos",
                columns: table => new
                {
                    RiscoId = table.Column<Guid>(type: "uuid", nullable: false),
                    PerigoId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RiscoPerigos", x => new { x.RiscoId, x.PerigoId });
                    table.ForeignKey(
                        name: "FK_RiscoPerigos_Perigos_PerigoId",
                        column: x => x.PerigoId,
                        principalTable: "Perigos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RiscoPerigos_Riscos_RiscoId",
                        column: x => x.RiscoId,
                        principalTable: "Riscos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RiscoPerigos_PerigoId",
                table: "RiscoPerigos",
                column: "PerigoId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RiscoPerigos");

            migrationBuilder.AddColumn<string>(
                name: "Perigos",
                table: "Riscos",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
