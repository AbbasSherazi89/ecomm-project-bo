import { Injectable } from '@angular/core';
import { sellerType } from '../seller-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class User {
  constructor(private http: HttpClient, private router:Router) {}

  userSignup(user: sellerType) {
    this.http
      .post(`http://localhost:3000/user`, user, { observe: 'response' })
      .subscribe((res) => {
        localStorage.setItem('user',JSON.stringify(res));
        this.router.navigate(['/']);
      });
  }
}
