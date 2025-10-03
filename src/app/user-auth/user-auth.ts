import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { sellerType } from '../seller-type';

@Component({
  selector: 'app-user-auth',
  imports: [FormsModule],
  template: `
    <div class="user-auth">
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
      </form>
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
}
  `,
})
export class UserAuth {
  userSignUp(data: sellerType) {
    console.log(data);
  }
}
