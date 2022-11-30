import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() usersFromHomeComponent: any;
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  registerForm: FormGroup | undefined;
  maxDate: Date;
  validationErrors: string[] = [];
  

  constructor(public accountService: AccountService, public toastr: ToastrService, public router: Router, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
    // this.maxDate = new Date();                                   //for future development 
    // this.maxDate.setFullYear(this.maxDate.getFullYear() -18);
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      // date: ['', Validators.required],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    })

    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })

  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value
        ? null : { isMatching: true }
    }
  }

  register(): void {
    console.log(this.registerForm?.value)
    // this.accountService.register(this.model).subscribe(response => {
    //   this.router.navigateByUrl("/tools")
    //   console.log(response)
    //   this.cancel()
    // }, err => { 
    //   this.toastr.error(err.error) 
    // })
  }


  // cancel() {
  //   // this.cancelRegister.emit(false);
  // }



}
