using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    public partial class ToolPropertiesV2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ToolToolProperties");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Properties",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "CurrentValue",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "ExternalBendProtectorState",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "ExternalCasingConditionState",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "ExternalCompleteButtonsState",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "ExternalCompleteHandlesState",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "ExternalIsCleanState",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "ExternalLeakageState",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "ExternalOuterCoverState",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "ExternalPlugState",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "ExternalWireState",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "IdleRunState",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "InternalBearingsState",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "InternalBendProtectorState",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "InternalCommutatorState",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "InternalElectricEqState",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "InternalEngineDirtyState",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "InternalPlugWireState",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "IsValid",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "IsolateResistanceState",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "MesauredResistanceState",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "PermissibleProtectiveConductorResistance",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "ProtectiveConductorResistance",
                table: "Properties");

            migrationBuilder.RenameColumn(
                name: "VoltageValue",
                table: "Properties",
                newName: "ToolPropertiesId");

            migrationBuilder.RenameColumn(
                name: "RequiredResistanceState",
                table: "Properties",
                newName: "ToolId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Properties",
                table: "Properties",
                columns: new[] { "ToolId", "ToolPropertiesId" });

            migrationBuilder.CreateTable(
                name: "ToolProperties",
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
                    table.PrimaryKey("PK_ToolProperties", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Properties_ToolPropertiesId",
                table: "Properties",
                column: "ToolPropertiesId");

            migrationBuilder.AddForeignKey(
                name: "FK_Properties_ToolProperties_ToolPropertiesId",
                table: "Properties",
                column: "ToolPropertiesId",
                principalTable: "ToolProperties",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Properties_Tools_ToolId",
                table: "Properties",
                column: "ToolId",
                principalTable: "Tools",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Properties_ToolProperties_ToolPropertiesId",
                table: "Properties");

            migrationBuilder.DropForeignKey(
                name: "FK_Properties_Tools_ToolId",
                table: "Properties");

            migrationBuilder.DropTable(
                name: "ToolProperties");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Properties",
                table: "Properties");

            migrationBuilder.DropIndex(
                name: "IX_Properties_ToolPropertiesId",
                table: "Properties");

            migrationBuilder.RenameColumn(
                name: "ToolPropertiesId",
                table: "Properties",
                newName: "VoltageValue");

            migrationBuilder.RenameColumn(
                name: "ToolId",
                table: "Properties",
                newName: "RequiredResistanceState");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Properties",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "CurrentValue",
                table: "Properties",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "ExternalBendProtectorState",
                table: "Properties",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "ExternalCasingConditionState",
                table: "Properties",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "ExternalCompleteButtonsState",
                table: "Properties",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "ExternalCompleteHandlesState",
                table: "Properties",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "ExternalIsCleanState",
                table: "Properties",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "ExternalLeakageState",
                table: "Properties",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "ExternalOuterCoverState",
                table: "Properties",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "ExternalPlugState",
                table: "Properties",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "ExternalWireState",
                table: "Properties",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IdleRunState",
                table: "Properties",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "InternalBearingsState",
                table: "Properties",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "InternalBendProtectorState",
                table: "Properties",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "InternalCommutatorState",
                table: "Properties",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "InternalElectricEqState",
                table: "Properties",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "InternalEngineDirtyState",
                table: "Properties",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "InternalPlugWireState",
                table: "Properties",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsValid",
                table: "Properties",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsolateResistanceState",
                table: "Properties",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "MesauredResistanceState",
                table: "Properties",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PermissibleProtectiveConductorResistance",
                table: "Properties",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ProtectiveConductorResistance",
                table: "Properties",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Properties",
                table: "Properties",
                column: "Id");

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
    }
}
