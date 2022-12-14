import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReplaySubject } from 'rxjs';
import { map } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  isRegister: boolean
  baseUrl = environment.apiUrl
  private currentUserSource = new ReplaySubject<User>(1);
  isLoggedIn: boolean = false;
  currentUser$ = this.currentUserSource.asObservable();

  constructor(public http: HttpClient, public toastr: ToastrService, public router: Router) {
    this.isRegister = false;
  }
  
  login(model: any) {
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response
        if (user) {
          this.setCurrentUser(user)
        }
      })
    )
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((user: User) => {
        if (user) {
          this.isRegister = true
          this.toastr.success("You registered new user, check ... tab")
        }
        return user
      })
    )
  }

  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user))
    this.currentUserSource.next(user)
  }

  logout() {
    localStorage.removeItem('user')
    this.currentUserSource.next(null)
  }

  logged(){
    this.currentUser$.subscribe(response => {
      if (response) {
        return true
      }
    })
  }
   

}
