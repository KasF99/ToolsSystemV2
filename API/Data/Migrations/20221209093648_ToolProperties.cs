using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    public partial class ToolProperties : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Properties",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ExternalIsCleanState = table.Column<bool>(type: "bit", nullable: false),
                    ExternalCasingConditionState = table.Column<bool>(type: "bit", nullable: false),
                    ExternalPlugState = table.Column<bool>(type: "bit", nullable: false),
                    ExternalWireState = table.Column<bool>(type: "bit", nullable: false),
                    ExternalBendProtectorState = table.Column<bool>(type: "bit", nullable: false),
                    ExternalCompleteButtonsState = table.Column<bool>(type: "bit", nullable: false),
                    ExternalCompleteHandlesState = table.Column<bool>(type: "bit", nullable: false),
                    ExternalOuterCoverState = table.Column<bool>(type: "bit", nullable: false),
                    ExternalLeakageState = table.Column<bool>(type: "bit", nullable: false),
                    InternalBendProtectorState = table.Column<bool>(type: "bit", nullable: false),
                    InternalPlugWireState = table.Column<bool>(type: "bit", nullable: false),
                    InternalElectricEqState = table.Column<bool>(type: "bit", nullable: false),
                    InternalEngineDirtyState = table.Column<bool>(type: "bit", nullable: false),
                    InternalCommutatorState = table.Column<bool>(type: "bit", nullable: false),
                    InternalBearingsState = table.Column<bool>(type: "bit", nullable: false),
                    MesauredResistanceState = table.Column<int>(type: "int", nullable: false),
                    RequiredResistanceState = table.Column<int>(type: "int", nullable: false),
                    IsolateResistanceState = table.Column<bool>(type: "bit", nullable: false),
                    CurrentValue = table.Column<int>(type: "int", nullable: false),
                    VoltageValue = table.Column<int>(type: "int", nullable: false),
                    ProtectiveConductorResistance = table.Column<int>(type: "int", nullable: false),
                    PermissibleProtectiveConductorResistance = table.Column<int>(type: "int", nullable: false),
                    IdleRunState = table.Column<bool>(type: "bit", nullable: false),
                    IsValid = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Properties", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ToolToolProperties",
                columns: table => new
                {
                    ToolId = table.Column<int>(type: "int", nullable: false),
                    ToolPropertiesId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ToolToolProperties", x => new { x.ToolId, x.ToolPropertiesId });
                    table.ForeignKey(
                        name: "FK_ToolToolProperties_Properties_ToolPropertiesId",
                        column: x => x.ToolPropertiesId,
                        principalTable: "Properties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ToolToolProperties_Tools_ToolId",
                        column: x => x.ToolId,
                        principalTable: "Tools",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ToolToolProperties_ToolPropertiesId",
                table: "ToolToolProperties",
                column: "ToolPropertiesId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ToolToolProperties");

            migrationBuilder.DropTable(
                name: "Properties");
        }
    }
}
