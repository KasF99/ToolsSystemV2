import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  externalInspection!: FormGroup | undefined;
  internalInspection!: FormGroup | undefined;
  insulationResistanceMeasurement!: FormGroup | undefined;
  protectiveCircuitCheck!: FormGroup | undefined;
  iddleCheck!: FormGroup | undefined;
  finalEvaluation!: FormGroup | undefined;
  toolParams: ToolsParams
  toolProp: ToolProperties
  step1 = false;
  step2 = false;
  step3 = false;
  step4 = false;
  step5 = false;
  ster6 = false;
  step = 1;
  model: any = {};
  tools: Tool[] | undefined
  serviceForm: FormGroup[] | undefined;
  minDate: Date = new Date();
  validationErrors: string[] = [];
  members: Member[] | undefined;

  constructor(private memberService: MembersService, public accountService: AccountService,
    public toastr: ToastrService, public router: Router, public fb: FormBuilder, public toolService: ToolService) {
    this.toolParams = this.toolService.getToolParams();
  }

  ngOnInit(): void {
    this.loadMembers()
    this.loadToolsNP()
    this.initializeForm()
  }


  loadMembers() {
    this.memberService.getMembers().subscribe(member => {
      this.members = member;
    })
  }

  loadToolsNP() {
    this.toolService.getTools(this.toolParams, true).subscribe(tools => {
      this.tools = tools
    })
  }

  initializeForm() {
    this.externalInspection = this.fb.group({
      externalIsCleanState: ['', Validators.required],
      externalCasingConditionState: ['', Validators.required],
      externalPlugState: ['', Validators.required],
      externalWireState: ['', Validators.required],
      externalBendProtectorState: ['', Validators.required],
      externalCompleteButtonsState: ['', Validators.required],
      externalCompleteHandlesState: ['', Validators.required],
      externalOuterCoverState: ['', Validators.required],
      externalLeakageState: ['', Validators.required],
    });

    this.internalInspection = this.fb.group({
      internalBendProtectorState: ['', Validators.required],
      internalPlugWireState: ['', Validators.required],
      internalElectricEqState: ['', Validators.required],
      internalEngineDirtyState: ['', Validators.required],
      internalCommutatorState: ['', Validators.required],
      internalBearingsState: ['', Validators.required],
    });

    this.insulationResistanceMeasurement = this.fb.group({
      mesauredResistanceState: ['', Validators.required],
      requiredResistanceState: ['', Validators.required],
      isolateResistanceState: ['', Validators.required]
    });

    this.protectiveCircuitCheck = this.fb.group({
      // highest_qualification: ['', Validators.required],
      // university: ['', Validators.required],
      // total_marks: ['', Validators.required],
      currentValue: ['', Validators.required],
      voltageValue: ['', Validators.required],
      protectiveConductorResistance: ['', Validators.required],
      permissibleProtectiveConductorResistance: ['', Validators.required], 
      ///trzeba dopisac ostatni wiersz!
    });

    this.iddleCheck = this.fb.group({
      idleRunState: ['', Validators.required], 
    });

    this.finalEvaluation = this.fb.group({
      isValid: ['', Validators.required], //to ma sie zatwierdzac jesli nie ma zadnego false
      //dodac uwagi
      //dodac zmiane daty
    })

    this.serviceForm = [
      this.externalInspection,
      this.internalInspection,
      this.insulationResistanceMeasurement,
      this.iddleCheck,
      this.finalEvaluation
    ]
  }

  get external() { return this.externalInspection.controls; }

  get internal() { return this.internalInspection.controls; }

  get iRM() { return this.insulationResistanceMeasurement.controls; }

  get iC() { return this.iddleCheck.controls; }

  get fE() { return this.finalEvaluation.controls; }

  next() {
    if (this.step == 1) {
      this.step1
        = true;
      if (this.externalInspection.invalid) { return }
      this.step++
    }

    else if (this.step == 2) {
      this.step2 = true;
      if (this.internalInspection.invalid) { return }
      this.step++;
    }

  }

  previous() {
    this.step--

    if (this.step == 1) {
      this.step2 = false;
    }
    if (this.step == 2) {
      this.step3 = false;
    }

  }

  submit() {

    if (this.step == 3) {
      this.step3 = true;
      if (this.insulationResistanceMeasurement.invalid) { return }
      alert("Well done!!")
    }
  }

  register(): void {
    // const dob = this.getDateOnly(this.registerForm.controls['dateOfService'].value)
    // const values = { ...this.registerForm.value, date: dob }
    this.toolService.serviceTool("jajka").subscribe(response => {
      console.log(this.serviceForm.values)
      // this.toastr.info("You have added new tool, redirecting to the Tools tab")
      // this.redirectTo('/admin');
    }, err => {
      this.validationErrors = err
    })
  }
}
