using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PGRFacilAPI.Persistance.Migrations
{
    /// <inheritdoc />
    public partial class AddsPerigoDescricaoIndex : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Perigos_Descricao",
                table: "Perigos",
                column: "Descricao",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Perigos_Descricao",
                table: "Perigos");
        }
    }
}
