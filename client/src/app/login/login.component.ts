import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  @Output() cancelLogin = new EventEmitter();
  currentUser$: Observable<User>



  constructor(public accountService: AccountService, public router: Router, public toastr: ToastrService) { }

  ngOnInit(): void {
  }

  login(): void {
    this.accountService.login(this.model).subscribe(response => {
      this.cancel()
      this.currentUser$ = this.accountService.currentUser$
      this.router.navigateByUrl("/tools")
      this.toastr.success("You have been logged in: " + this.model.username.toUpperCase())
    })
  }

  cancel() {
    this.cancelLogin.emit(false);
  }

}
