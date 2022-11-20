import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false
  loginMode = false
  users: any = {};

  constructor(public http: HttpClient) { }

  ngOnInit(): void {
    // this.getUsers()
  }

  registerToggle() {
    this.registerMode =!this.registerMode
  }

  loginToggle() {
    this.loginMode =!this.loginMode
  }

  getUsers() {
    this.http.get('https://localhost:5001/api/users').subscribe(users => {
      this.users = users
    })
  }

  cancelRegisterMode(event: boolean) { 
    this.registerMode = false
  }

  cancelLoginMode(event: boolean) { 
    this.loginMode = false
  }

}
