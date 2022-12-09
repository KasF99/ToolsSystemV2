using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    public partial class ToolPropertiesV3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Properties_ToolProperties_ToolPropertiesId",
                table: "Properties");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ToolProperties",
                table: "ToolProperties");

            migrationBuilder.RenameTable(
                name: "ToolProperties",
                newName: "ToolProps");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ToolProps",
                table: "ToolProps",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Properties_ToolProps_ToolPropertiesId",
                table: "Properties",
                column: "ToolPropertiesId",
                principalTable: "ToolProps",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Properties_ToolProps_ToolPropertiesId",
                table: "Properties");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ToolProps",
                table: "ToolProps");

            migrationBuilder.RenameTable(
                name: "ToolProps",
                newName: "ToolProperties");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ToolProperties",
                table: "ToolProperties",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Properties_ToolProperties_ToolPropertiesId",
                table: "Properties",
                column: "ToolPropertiesId",
                principalTable: "ToolProperties",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
