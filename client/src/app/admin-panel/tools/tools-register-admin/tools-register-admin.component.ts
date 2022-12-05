import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_models/member';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { ToolService } from 'src/app/_services/tool.service';

@Component({
  selector: 'app-tools-register-admin',
  templateUrl: './tools-register-admin.component.html',
  styleUrls: ['./tools-register-admin.component.css']
})
export class ToolsRegisterAdminComponent implements OnInit {
  // @Output() registerMode = new EventEmitter()
  

  model: any = {};
  registerForm: FormGroup | undefined;
  minDate: Date = new Date();
  validationErrors: string[] = [];
  members: Member[] | undefined;

  constructor(private memberService: MembersService, public accountService: AccountService,
    public toastr: ToastrService, public router: Router, public fb: FormBuilder, public toolService: ToolService) {
    // this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);                                 //for future development 
  }

  ngOnInit(): void {
    this.loadMembers()
    this.initializeForm()
    this.minDate.setFullYear(this.minDate.getFullYear()); //set minimum date
  }

  loadMembers() {
    this.memberService.getMembers().subscribe(member => {
      this.members = member;
    })
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      dateOfService: ['', Validators.required],
      toolname: ['', Validators.required],
      toolnumber: ['', Validators.required],
      owner: ['', Validators.required],
    })
  }

  register(): void {
    console.log(this.registerForm.value)
    const dob = this.getDateOnly(this.registerForm.controls['dateOfService'].value)
    const values = { ...this.registerForm.value, date: dob }
    this.toolService.addTool(values, values.owner).subscribe(response => {  
      console.log(this.registerForm.value)
      console.log(response.dateOfService)
      this.toastr.info("You have added new tool, redirecting to the TOOLs tab")
      this.redirectTo('/admin');
    }, err => {
      this.validationErrors = err
    })
  }

  private getDateOnly(dob: string | undefined) {
    if (!dob) return;
    let theDob = new Date(dob);
    return new Date(theDob.setMinutes(theDob.getMinutes() - theDob.getTimezoneOffset())).toISOString().slice(0, 10)
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }

}
