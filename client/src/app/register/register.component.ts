import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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


  constructor(public accountService: AccountService, public toastr: ToastrService, public router: Router) { }

  ngOnInit(): void {
  }

  register(): void {
    this.accountService.register(this.model).subscribe(response => {
      this.router.navigateByUrl("/tools")
      console.log(response)
      this.cancel()
    }, err => { 
      this.toastr.error(err.error) 
    })
  }
  cancel() {
    // this.cancelRegister.emit(false);
  }



}
