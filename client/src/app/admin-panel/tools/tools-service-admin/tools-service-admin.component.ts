import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ToolProperties } from 'src/app/_models/toolProperties';
import { Tool } from 'src/app/_models/tools';
import { ToolsParams } from 'src/app/_models/toolsParams';
import { MembersService } from 'src/app/_services/members.service';
import { ToolService } from 'src/app/_services/tool.service';

@Component({
  selector: 'app-tools-service-admin',
  templateUrl: './tools-service-admin.component.html',
  styleUrls: ['./tools-service-admin.component.css']
})
export class ToolsServiceAdminComponent implements OnInit {

  serviceForm: FormGroup | undefined
  formSubmit: FormGroup | undefined
  toolProperties: ToolProperties
  constructor(private builder: FormBuilder, public toolService: ToolService, public memberService: MembersService,
    public route: ActivatedRoute, public toastr: ToastrService, public router: Router) {
    this.toolParams = this.toolService.getToolParams();
  }

  isLinear = true;
  isTrue: boolean
  MV: string = '0'
  RV: string = '0'
  checked: boolean
  disabled: boolean
  validationErrors: string[] = [];
  minDate: Date = new Date();
  toolParams: ToolsParams
  tools: Tool[] = []
  tool: Tool


  ngOnInit(): void {
    this.loadToolsNP()
    this.initializeForm()
    this.changeIRS()
    this.changeTBstate()
  }

  initializeForm() {
    this.serviceForm = this.builder.group({
      titlePage: this.builder.group({
        toolname: this.builder.control('', [Validators.required]),
      }),

      externalInspection: this.builder.group({
        externalIsCleanState: this.builder.control(null, Validators.nullValidator),
        externalCasingConditionState: this.builder.control(null, Validators.nullValidator),
        externalPlugState: this.builder.control(null, Validators.nullValidator),
        externalWireState: this.builder.control(null, Validators.nullValidator),
        externalBendProtectorState: this.builder.control(null, Validators.nullValidator),
        externalCompleteButtonsState: this.builder.control(null, Validators.nullValidator),
        externalCompleteHandlesState: this.builder.control(null, Validators.nullValidator),
        externalOuterCoverState: this.builder.control(null, Validators.nullValidator),
        externalLeakageState: this.builder.control(null, Validators.nullValidator),
      }),

      internalInspection: this.builder.group({
        internalBendProtectorState: this.builder.control(null, Validators.nullValidator),
        internalPlugWireState: this.builder.control(null, Validators.nullValidator),
        internalElectricEqState: this.builder.control(null, Validators.nullValidator),
        internalEngineDirtyState: this.builder.control(null, Validators.nullValidator),
        internalCommutatorState: this.builder.control(null, Validators.nullValidator),
        internalBearingsState: this.builder.control(null, Validators.nullValidator),
      }),

      insulationResistanceMeasurement: this.builder.group({
        mesauredResistanceState: this.builder.control('', [Validators.required, Validators.pattern("^[0-9]*$")]),
        requiredResistanceState: this.builder.control('', [Validators.required, Validators.pattern("^[0-9]*$")]),
        isolateResistanceState: this.builder.control('', Validators.nullValidator),
      }),

      protectionCircuitCheck: this.builder.group({
        currentValue: this.builder.control('', [Validators.required, Validators.pattern("^[0-9]*$")]),
        voltageValue: this.builder.control('', [Validators.required, Validators.pattern("^[0-9]*$")]),
        protectiveConductorResistance: this.builder.control('', [Validators.required, Validators.pattern("^[0-9]*$")]),
        permissibleProtectiveConductorResistance: this.builder.control('', [Validators.required, Validators.pattern("^[0-9]*$")]),
        protectionCircuitState: this.builder.control('', Validators.nullValidator),
      }),

      idleCheck: this.builder.group({
        idleRunState: this.builder.control(null, Validators.nullValidator),
      }),

      finalEvaluation: this.builder.group({
        remarks: this.builder.control(' ', Validators.nullValidator),
        dateOfService: this.builder.control(this.NextService, Validators.nullValidator),
        isValid: this.builder.control('', Validators.required),
      })
    });

    this.formSubmit = this.builder.group({
    })
  }
  
  get titlePage() {
    return this.serviceForm.get("titlePage") as FormGroup;
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

  get ToolId() {
    return this.titlePage.get('toolname').value
  }

  get IsValidForm() {
    return this.finalEvaluation.get('isValid').value 
  }

  get NextService() {
    if (this.tool)
      return this.tool.dateOfService
    else {
      const d: Date = new Date();
      return d
    }
  }

  changeTBstate() {
    this.insulationResistanceMeasurement.get("requiredResistanceState").valueChanges.subscribe(x => {
      this.RV = x
      this.insulationResistanceMeasurement.get('requiredResistanceState').markAsTouched()
    })

    this.insulationResistanceMeasurement.get("mesauredResistanceState").valueChanges.subscribe(x => {
      this.MV = x

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
        // this.insulationResistanceMeasurement.controls['mesauredResistanceState'].disable()
        // this.insulationResistanceMeasurement.controls['requiredResistanceState'].disable()
      }
      if (x !== null) {
        this.insulationResistanceMeasurement.controls['mesauredResistanceState'].enable()
        this.insulationResistanceMeasurement.controls['requiredResistanceState'].enable()
        this.insulationResistanceMeasurement.get('requiredResistanceState').markAsUntouched()
        this.insulationResistanceMeasurement.get('mesauredResistanceState').markAsUntouched()
      }
    })
  }

  logKeyValuePairs(group: FormGroup): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logKeyValuePairs(abstractControl);
      } else {
        this.formSubmit.addControl(key, new FormControl(abstractControl.value, Validators.required));
      }
    });
  }

  flatForm(form: FormGroup) {
    console.log(form.value)
  }

  HandleSubmit() {
    if (this.serviceForm.valid) {
      this.logKeyValuePairs(this.serviceForm)
      this.serviceTool()
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

  loadToolsNP() {
    this.toolService.getToolsAll().subscribe(tools => {
      this.tools = tools
    })
  }

  loadTool() {
    this.toolService.getTool(this.titlePage.get('toolname').value).subscribe(tool => {
      this.tool = tool
    })
    console.log(this.ToolId)
    console.log((this.ToolId.length))
  }

  serviceTool() {
    this.toolService.serviceTool(this.ToolId, this.formSubmit.value).subscribe(() => {
      this.toastr.info("kaczing!: " +  this.tool.toolName)
      this.redirectTo('/admin');
    })
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }


//   reload() {
//     const url = self ? this.router.url : '/';
    
//     this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
//       this.router.navigate([`/${url}`]).then(()=>{
//       console.log(`After navigation I am on:${this.router.url}`)
//       })
//       })
//   }

//   reloadComponent(self:boolean,urlToNavigateTo ?:string){
//     //skipLocationChange:true means dont update the url to / when navigating
//    console.log("Current route I am on:",this.router.url);
//    const url=self ? this.router.url :urlToNavigateTo;
//    this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
//      this.router.navigate([`/${url}`]).then(()=>{
//        console.log(`After navigation I am on:${this.router.url}`)
//      })
//    })
//  }




}

