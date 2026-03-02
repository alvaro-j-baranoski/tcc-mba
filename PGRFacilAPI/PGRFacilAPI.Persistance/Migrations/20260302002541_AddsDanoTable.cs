using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PGRFacilAPI.Persistance.Migrations
{
    /// <inheritdoc />
    public partial class AddsDanoTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DanoTable",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Descricao = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DanoTable", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DanoTable_Descricao",
                table: "DanoTable",
                column: "Descricao",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DanoTable");
        }
    }
}
