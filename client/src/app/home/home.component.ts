import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false
  loginMode = false
  users: any = {};
  ifLogged = false;

  constructor(public http: HttpClient, public accountService: AccountService, public router: Router) { }

  ngOnInit(): void {
    this.logged()
  }

  registerToggle() {
    this.registerMode =!this.registerMode
  }

  loginToggle() {
    this.loginMode =!this.loginMode
  }

  getUsers() {
    this.http.get(environment.apiUrl + 'users').subscribe(users => {
      this.users = users
    })
  }

  cancelRegisterMode(event: boolean) { 
    this.registerMode = false
  }

  cancelLoginMode(event: boolean) { 
    this.loginMode = false
  }

  logged() {
    this.accountService.currentUser$.subscribe(response => {
      if (response) {
        this.router.navigateByUrl("/tools")
      }
    })
  }

}
