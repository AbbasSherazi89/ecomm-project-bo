import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { cart, loginType, product, sellerType } from '../seller-type';
import { User } from '../services/user';
import { Product } from '../services/product';

@Component({
  selector: 'app-user-auth',
  imports: [FormsModule],
  template: `
    <div class="user-auth">
      @if(!showLogin){
      <div class="signup">
        <h1>User Signup</h1>
        <form
          class="common-form"
          #userSignup="ngForm"
          (ngSubmit)="userSignUp(userSignup.value)"
        >
          <input
            type="text"
            name="name"
            placeholder="Enter user name"
            ngModel
            class="form-input"
            #name="ngModel"
            required
            minlength="3"
            maxlength="20"
          />
          @if(name.invalid && name.touched){
          <p class="input-error">
            Enter a valid name with minimum of 3 characters
          </p>
          }
          <input
            type="email"
            name="email"
            email
            placeholder="Enter user email"
            ngModel
            class="form-input"
            #email="ngModel"
            required
          />
          @if(email.invalid && email.touched){
          <p class="input-error">
            @if(email.errors?.['required']){ 📧 Email address is required }
            @else if(email.errors?.['email']){ ❌ Please enter a valid email
            format (e.g., user@example.com) }
          </p>
          }
          <div class="password-wrapper">
            <input
              [type]="showPassword ? 'text' : 'password'"
              name="password"
              placeholder="Enter password"
              ngModel
              class="form-input pass-input"
              #password="ngModel"
              required
              minlength="5"
            />
            <i
              class="material-icons password-toggle"
              (click)="showPassword = !showPassword"
              >{{ showPassword ? 'visibility' : 'visibility_off' }}</i
            >
          </div>
          @if(password.invalid && password.touched){
          <p class="input-error">
            @if(password.errors?.['required']){ 🔒 Password is required }
            @if(password.errors?.['minlength']){ 📏 Password must be at least 5
            characters long }
          </p>
          }
          <button [disabled]="userSignup.invalid" class="form-btn">
            SignUp
          </button>
          <p>
            Already have an account? <a (click)="openLogin()">Click here</a>
          </p>
        </form>
      </div>
      } @if(showLogin){
      <div class="login">
        <h1>User Login</h1>
        <form
          class="common-form"
          #userlogin="ngForm"
          (ngSubmit)="userLogin(userlogin.value)"
        >
          <p class="error-p">{{ isError }}</p>
          <input
            type="email"
            name="email"
            placeholder="Enter user email"
            ngModel
            #email="ngModel"
            required
            class="form-input"
            [class.error]="email.invalid && email.touched"
            [class.success]="email.valid && email.touched"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            ngModel
            #password="ngModel"
            required
            class="form-input"
            [class.error]="password.invalid && password.touched"
            [class.success]="password.valid && password.touched"
          />
          <button [disabled]="userlogin.invalid" class="form-btn">Login</button>
          <p>Don't have an account? <a (click)="openSignup()">Click here</a></p>
        </form>
      </div>
      }
    </div>
  `,
  styles: `
  
    .user-auth{
      text-align: center;
        h1 {
        color: blueviolet;
        padding: 50px 0px 80px 0px;
        margin: 0px;
        font-size: 34px;
    }
    a{
      color:blueviolet;
    }
    a:hover{
      color:blue;
      cursor:pointer;
    }
    .password-wrapper {
      position: relative;
      display: inline-block;
      width: 100%;
    }
    .password-toggle {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      color: grey;
      
      &:hover {
        color: blueviolet;
      }
    }
    .pass-input{
      width: 100%;
      padding-right: 40px;
    }
    }
  `,
})
export class UserAuth {
  showLogin: boolean = true;
  isError: string = '';
  showPassword: boolean = false;
  constructor(private _user: User, private _product: Product) {}
  ngOnInit() {
    this._user.userAuthReload();
  }
  userSignUp(data: sellerType) {
    this._user.userSignup(data);
  }
  userLogin(data: loginType) {
    this._user.userLogin(data);
    this._user.inValidUser.subscribe((res) => {
      if (res) {
        this.isError = 'Login failed! please check your credentials.';
        setTimeout(() => {
          this.isError = '';
        }, 2000);
      } else {
        this.localCartToRemoteCart();
      }
    });
  }
  openSignup() {
    this.showLogin = false;
  }
  openLogin() {
    this.showLogin = true;
  }
  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).body[0].id;
    if (data) {
      let cartDataList: product[] = JSON.parse(data);
      cartDataList.forEach((product: product, index) => {
        let cartData: cart = {
          ...product,
          producId: product.id,
          userId,
        };
        delete cartData.id;
        setTimeout(() => {
          this._product.addToCart(cartData);
        }, 1000);
        if (cartDataList.length === index + 1) {
          localStorage.removeItem('localCart');
        }
      });
    }
    setTimeout(() => {
      this._product.getCartList(userId);
    }, 2000);
  }
}
