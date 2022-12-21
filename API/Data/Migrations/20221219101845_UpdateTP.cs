using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    public partial class UpdateTP : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "ProtectionCircuitState",
                table: "Properties",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Remarks",
                table: "Properties",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProtectionCircuitState",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "Remarks",
                table: "Properties");
        }
    }
}
