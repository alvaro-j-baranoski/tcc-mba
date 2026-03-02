using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PGRFacilAPI.Persistance.Migrations
{
    /// <inheritdoc />
    public partial class ChangeDanoTableName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_DanoTable",
                table: "DanoTable");

            migrationBuilder.RenameTable(
                name: "DanoTable",
                newName: "Danos");

            migrationBuilder.RenameIndex(
                name: "IX_DanoTable_Descricao",
                table: "Danos",
                newName: "IX_Danos_Descricao");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Danos",
                table: "Danos",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Danos",
                table: "Danos");

            migrationBuilder.RenameTable(
                name: "Danos",
                newName: "DanoTable");

            migrationBuilder.RenameIndex(
                name: "IX_Danos_Descricao",
                table: "DanoTable",
                newName: "IX_DanoTable_Descricao");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DanoTable",
                table: "DanoTable",
                column: "Id");
        }
    }
}
