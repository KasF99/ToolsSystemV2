import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { ToolProperties } from 'src/app/_models/toolProperties';
import { MembersService } from 'src/app/_services/members.service';
import { ToolService } from 'src/app/_services/tool.service';

@Component({
  selector: 'app-tools-service-admin',
  templateUrl: './tools-service-admin.component.html',
  styleUrls: ['./tools-service-admin.component.css']
})
export class ToolsServiceAdminComponent implements OnInit {

  serviceForm: FormGroup | undefined
  toolProperties: ToolProperties
  constructor(private builder: FormBuilder, public toolService: ToolService, public memberService: MembersService) { }

  isLinear = true;
  isTrue: boolean
  MV: string = '0'
  RV: string = '0'
  checked: boolean
  disabled: boolean


  ngOnInit(): void {
    this.initializeForm()
    this.changeIRS()
    this.changeTBstate()
  }

  initializeForm() {
    this.serviceForm = this.builder.group({
      externalInspection: this.builder.group({
        externalIsCleanState: this.builder.control('', [Validators.nullValidator]),
        externalCasingConditionState: this.builder.control('', Validators.nullValidator),
        externalPlugState: this.builder.control('', Validators.nullValidator),
        externalWireState: this.builder.control('', Validators.nullValidator),
        externalBendProtectorState: this.builder.control('', Validators.nullValidator),
        externalCompleteButtonsState: this.builder.control('', Validators.nullValidator),
        externalCompleteHandlesState: this.builder.control('', Validators.nullValidator),
        externalOuterCoverState: this.builder.control('', Validators.nullValidator),
        externalLeakageState: this.builder.control('', Validators.nullValidator),
      }),
      internalInspection: this.builder.group({
        internalBendProtectorState: this.builder.control('', Validators.nullValidator),
        internalPlugWireState: this.builder.control('', Validators.nullValidator),
        internalElectricEqState: this.builder.control('', Validators.nullValidator),
        internalEngineDirtyState: this.builder.control('', Validators.nullValidator),
        internalCommutatorState: this.builder.control('', Validators.nullValidator),
        internalBearingsState: this.builder.control('', Validators.nullValidator),
      }),
      insulationResistanceMeasurement: this.builder.group({
        mesauredResistanceState: this.builder.control('', Validators.nullValidator),
        requiredResistanceState: this.builder.control('', [Validators.nullValidator]),
        isolateResistanceState: this.builder.control({ value: this.isTrue }, Validators.nullValidator),
      }),

      protectionCircuitCheck: this.builder.group({
        currentValue: this.builder.control('', Validators.nullValidator),
        voltageValue: this.builder.control('', Validators.nullValidator),
        protectiveConductorResistance: this.builder.control('', Validators.nullValidator),
        permissibleProtectiveConductorResistance: this.builder.control('', Validators.nullValidator),
        //dodac ocene tak/nie w modelu API
      }),
      idleCheck: this.builder.group({
        idleRunState: this.builder.control('', Validators.nullValidator),
      }),

      finalEvaluation: this.builder.group({
        isValid: this.builder.control('', Validators.required),
        //dodac date nastepnego zadania - check!
        //uwagi
      }),
    });
  }

  get externalInspection() {
    return this.serviceForm.get("externalInspection") as FormGroup;
  }
  get internalInspection() {
    return this.serviceForm.get("internalInspection") as FormGroup;
  }
  get insulationResistanceMeasurement() {
    return this.serviceForm.get("insulationResistanceMeasurement") as FormGroup;
  }
  get protectionCircuitCheck() {
    return this.serviceForm.get("protectionCircuitCheck") as FormGroup;
  }
  get idleCheck() {
    return this.serviceForm.get("idleCheck") as FormGroup;
  }
  get finalEvaluation() {
    return this.serviceForm.get("finalEvaluation") as FormGroup;
  }

  changeTBstate() {
    this.insulationResistanceMeasurement.get("requiredResistanceState").valueChanges.subscribe(x => {
      this.RV = x
      this.insulationResistanceMeasurement.get('requiredResistanceState').markAsTouched()
    })

    this.insulationResistanceMeasurement.get("mesauredResistanceState").valueChanges.subscribe(x => {
      this.MV = x

      // console.log(parseInt(this.MV) > parseInt(this.RV))


      if (this.insulationResistanceMeasurement.controls['requiredResistanceState'].touched) {
        this.isTrue = this.isValid(parseInt(this.MV), parseInt(this.RV))

        this.insulationResistanceMeasurement.get('requiredResistanceState').markAsUntouched()

        this.insulationResistanceMeasurement.controls['isolateResistanceState'].setValue(this.isTrue)

      }
    })
  }


  changeIRS() {
    this.insulationResistanceMeasurement.get("isolateResistanceState").valueChanges.subscribe(x => {
      if (x === null) {

        this.insulationResistanceMeasurement.get('requiredResistanceState').markAsTouched()
        this.insulationResistanceMeasurement.get('mesauredResistanceState').markAsTouched()
        this.insulationResistanceMeasurement.controls['mesauredResistanceState'].setValue(null)
        this.insulationResistanceMeasurement.controls['requiredResistanceState'].setValue(null)
        this.insulationResistanceMeasurement.controls['mesauredResistanceState'].disable()
        this.insulationResistanceMeasurement.controls['requiredResistanceState'].disable()

      }
      if (x !== null) {
        this.insulationResistanceMeasurement.controls['mesauredResistanceState'].enable()
        this.insulationResistanceMeasurement.controls['requiredResistanceState'].enable()
      }
    })
  }

  HandleSubmit() {
    if (this.serviceForm.valid) {
      console.log(this.serviceForm.value);
    }
  }


  isValid(v1: number, v2: number) {
    if (v1 >= v2) {
      return true;
    }
    else if (v1 < v2) {
      return false
    }
  }
}
