import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  currentUser$: Observable<User>
  

  constructor(public accountService: AccountService, public router: Router, public toastr: ToastrService) { }

  ngOnInit(): void {
    
  }

  login() {
    this.accountService.login(this.model).subscribe(response => {
      console.log(response)
      this.router.navigateByUrl('/tools')
      this.currentUser$ = this.accountService.currentUser$
    }, err => {
      console.log(err)
    })
  }

  logout() {
    this.accountService.logout()
    this.toastr.success("You have been logged out")
    this.router.navigateByUrl('/')
  }

}
