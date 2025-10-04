import { Injectable } from '@angular/core';
import { loginType, sellerType } from '../seller-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class User {
  constructor(private http: HttpClient, private router: Router) {}

  userSignup(user: sellerType) {
    this.http
      .post(`http://localhost:3000/user`, user, { observe: 'response' })
      .subscribe((res) => {
        localStorage.setItem('user', JSON.stringify(res));
        this.router.navigate(['/']);
      });
  }
  userLogin(user: loginType) {
    return this.http
      .get<loginType>(
        `http://localhost:3000/user?email=${user.email}&password=${user.password}`,
        { observe: 'response' }
      )
      .subscribe((res) => {
        if (res && res.body) {
          localStorage.setItem('user', JSON.stringify(res));
          this.router.navigate(['/']);
        }
      });
  }
  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }
}
