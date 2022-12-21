using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{   
    [Table("Properties")]
    public class ToolProperties
    {
        public int Id { get; set; } 
        public bool? ExternalIsCleanState { get; set; } = null;
        public bool? ExternalCasingConditionState { get; set; }
        public bool? ExternalPlugState { get; set; }
        public bool? ExternalWireState { get; set; }
        public bool? ExternalBendProtectorState { get; set; }
        public bool? ExternalCompleteButtonsState { get; set; }
        public bool? ExternalCompleteHandlesState { get; set; }
        public bool? ExternalOuterCoverState { get; set; }
        public bool? ExternalLeakageState { get; set; }
        public bool? InternalBendProtectorState { get; set; }
        public bool? InternalPlugWireState { get; set; }
        public bool? InternalElectricEqState { get; set; }
        public bool? InternalEngineDirtyState { get; set; }
        public bool? InternalCommutatorState { get; set; }
        public bool? InternalBearingsState { get; set; }
        public int? MesauredResistanceState { get; set; } = 0;
        public int? RequiredResistanceState { get; set; } = 0;
        public bool? IsolateResistanceState { get; set; }
        public int? CurrentValue { get; set; } = 0;
        public int? VoltageValue { get; set; } = 0;
        public int? ProtectiveConductorResistance { get; set; } = 0;
        public int? PermissibleProtectiveConductorResistance { get; set; } = 0;
        public bool? ProtectionCircuitState { get; set; }
        public bool? IdleRunState { get; set; }
        public string Remarks { get; set; }
        public bool? IsValid { get; set; }
        public Tools Tools { get; set; }
        public int ToolsId { get; set; }

    }
}