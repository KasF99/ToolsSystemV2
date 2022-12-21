namespace API.DTOs
{
    public class ToolPropertiesDto
    {
        public int Id { get; set; }
        public bool? ExternalIsCleanState { get; set; } = false;
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
        public int? MesauredResistanceState { get; set; }
        public int? RequiredResistanceState { get; set; }
        public bool? IsolateResistanceState { get; set; }
        public int? CurrentValue { get; set; }
        public int? VoltageValue { get; set; }
        public int? ProtectiveConductorResistance { get; set; }
        public int? PermissibleProtectiveConductorResistance { get; set; }
        public bool? ProtectionCircuitState { get; set; }
        public bool? IdleRunState { get; set; }
        public DateTime DateOfService { get; set; }
        public string Remarks { get; set; }
        public bool? IsValid { get; set; }


      
    }
}