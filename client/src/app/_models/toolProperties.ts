export interface ToolProperties {
    externalIsCleanState?:boolean;
    externalCasingConditionState?:boolean;
    externalPlugState?:boolean;
    externalWireState?:boolean;
    externalBendProtectorState?:boolean;
    externalCompleteButtonsState?:boolean;
    externalCompleteHandlesState?:boolean;
    externalOuterCoverState?:boolean;
    externalLeakageState?:boolean;
    internalBendProtectorState?:boolean;
    internalPlugWireState?:boolean;
    internalElectricEqState?:boolean;
    internalEngineDirtyState?:boolean;
    internalCommutatorState?:boolean;
    internalBearingsState?: boolean;
    mesauredResistanceState: number;
    requiredResistanceState: number;
    isolateResistanceState?: boolean;
    currentValue?: number;
    voltageValue?: number;
    protectiveConductorResistance?: number;
    permissibleProtectiveConductorResistance?: number;
    idleRunState?:boolean;
    isValid?:boolean;
}