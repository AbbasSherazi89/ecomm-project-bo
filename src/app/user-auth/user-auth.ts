import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { loginType, sellerType } from '../seller-type';
import { User } from '../services/user';

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
          />
          <input
            type="email"
            name="email"
            placeholder="Enter user email"
            ngModel
            class="form-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            ngModel
            class="form-input"
          />
          <button class="form-btn">SignUp</button>
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
        <p class="error-p">{{isError}}</p>
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
}
  `,
})
export class UserAuth {
  showLogin: boolean = true;
  isError: string = '';
  constructor(private _user: User) {}
  ngOnInit() {
    this._user.userAuthReload();
  }
  userSignUp(data: sellerType) {
    this._user.userSignup(data);
  }
  userLogin(data: loginType) {
    this._user.userLogin(data);
    this._user.inValidUser.subscribe((res) => {
      console.log(res);
      if (res) {
        this.isError = 'Login failed! please check your credentials.';
        setTimeout(()=>{
          this.isError='';
        },2000);
      }
    });
  }
  openSignup() {
    this.showLogin = false;
  }
  openLogin() {
    this.showLogin = true;
  }
}
