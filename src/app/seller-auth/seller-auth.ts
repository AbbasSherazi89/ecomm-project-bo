import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { SellerService } from '../services/seller';
import { sellerType } from '../seller-type';
import { Router } from '@angular/router';
@Component({
  selector: 'app-seller-auth',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="seller-auth">
      <div class="sign-up">
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
          <button class="signup-btn">Sign Up</button>
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
  .signup-btn {
      height: 35px;
      color: blueviolet;
      border: 1px solid blueviolet;
      font-size: 16px;
      cursor: pointer;
  }
  }

  `,
})
export class SellerAuth {
  constructor(private _sellerService: SellerService, private router: Router) {}

  signUp(data: sellerType): void {
    this._sellerService.signUpSeller(data).subscribe((result) => {
      if (result) {
        this.router.navigate(['seller-home']);
      }
    });
  }
}
