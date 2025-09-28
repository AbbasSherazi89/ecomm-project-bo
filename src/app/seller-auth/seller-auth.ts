import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SellerService } from '../services/seller';
import { sellerType } from '../seller-type';
import { Router } from '@angular/router';
@Component({
  selector: 'app-seller-auth',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="seller-auth">
      <div *ngIf="!showlogin" class="sign-up">
        <h1>Seller sign-up</h1>
        <form
          #sellerSignUp="ngForm"
          class="common-form"
          (ngSubmit)="signUp(sellerSignUp.value)"
        >
          <input
            class="form-input"
            type="text"
            placeholder="Enter Name"
            name="name"
            ngModel
          />
          <input
            class="form-input"
            type="password"
            placeholder="Enter Password"
            name="password"
            ngModel
          />
          <input
            class="form-input"
            type="text"
            placeholder="Enter Email"
            name="email"
            ngModel
          />
          <button class="form-btn">Sign Up</button>
          <p class="auth-link">Already have an account? <span (click)="openLogin()">Login</span></p>
        </form>
      </div>

      <div *ngIf="showlogin" class="login">
        <h1>Seller Login</h1>
        <p style="color: red;">{{isError}}</p>
        <form
          #sellerLogin="ngForm"
          class="common-form"
          (ngSubmit)="logIn(sellerLogin.value)"
        >
          <input
            class="form-input"
            type="text"
            placeholder="Enter Email"
            name="email"
            ngModel
          />
          <input
            class="form-input"
            type="password"
            placeholder="Enter Password"
            name="password"
            ngModel
          />
          <button class="form-btn">Login</button>
          <p class="auth-link">Don't have an account? <span (click)="openSignup()">Sign Up</span></p>
        </form>
      </div>
    </div>
  `,
  styles: `
  .seller-auth{
    text-align: center;
      h1 {
      color: blueviolet;
      padding: 50px 0px 80px 0px;
      margin: 0px;
      font-size: 34px;
  }

  .auth-link{
    color: blueviolet;
    font-size: 14px;
    span{
      cursor: pointer;
      text-decoration: underline;
    }
  }
 
  }

  `,
})
export class SellerAuth {
  showlogin=false;
  isError:string="";
  constructor(private _sellerService: SellerService, private router: Router) {}

  ngOnInit(): void {
    this._sellerService.reloadSeller();
    // console.log();
    
  }
  signUp(data: sellerType): void {
    this._sellerService.signUpSeller(data);
  }
  logIn(data: sellerType): void {
    this._sellerService.userLogin(data);
    this._sellerService.isLoginError.subscribe(
      (isError)=>{
      if(isError){
        this.isError="Login failed! please check your credentials.";
      }
    });
  }

  openLogin(){
    this.showlogin=true;
  }
  openSignup(){
    this.showlogin=false;
  }
}
