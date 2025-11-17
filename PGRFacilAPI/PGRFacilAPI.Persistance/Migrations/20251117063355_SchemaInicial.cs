using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PGRFacilAPI.Persistance.Migrations
{
    /// <inheritdoc />
    public partial class SchemaInicial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Riscos",
                columns: table => new
                {
                    Guid = table.Column<Guid>(type: "uuid", nullable: false),
                    Local = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Atividades = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    Perigos = table.Column<string>(type: "text", nullable: false),
                    Danos = table.Column<string>(type: "text", nullable: false),
                    AgentesDeRisco = table.Column<int>(type: "integer", nullable: false),
                    TipoDeAvaliacao = table.Column<string>(type: "text", nullable: false),
                    Severidade = table.Column<long>(type: "bigint", nullable: false),
                    Probabilidade = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Riscos", x => x.Guid);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Riscos");
        }
    }
}
