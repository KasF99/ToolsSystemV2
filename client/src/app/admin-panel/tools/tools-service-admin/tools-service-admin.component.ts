import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { ToolProperties } from 'src/app/_models/toolProperties';
import { Tool } from 'src/app/_models/tools';
import { ToolsParams } from 'src/app/_models/toolsParams';
import { AccountService } from 'src/app/_services/account.service';
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
  isNull: boolean
  // MV = 0
  // RV = 0

  // myVar = new Observable(() => {
  //   if (this.MV > this.RV) this.isNull = true;
  //   if (this.RV > this.MV) this.isNull = true;
  //   console.log(this.isNull)
  // })





  ngOnInit(): void {
    this.initializeForm()
    this.irs()
    // this.MVRV()
    
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
        isolateResistanceState: this.builder.control('', Validators.nullValidator),
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
        //dodac date nastepnego zadania
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


  // MVRV() {
  //   this.insulationResistanceMeasurement.get("requiredResistanceState").valueChanges.subscribe(x => {
  //     this.RV = x
  //   })

  //   this.insulationResistanceMeasurement.get("mesauredResistanceState").valueChanges.subscribe(x => {
  //     this.MV = x
  //   })
  // }


  irs() {
    this.insulationResistanceMeasurement.get("isolateResistanceState").valueChanges.subscribe(x => {
      if (x === null) {
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

  // jebac() {
  //   this.myVar.subscribe(() => {

  //   })
  // }



}
