import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-checkout',
  imports: [FormsModule],
  template: `
    <div class="checkout">
      <h1>Checkout</h1>
      <div class="row">
        <div class="col-sm-7">
          <h3>Add shipping Address</h3>
          <form #orderData="ngForm" class="common-form">
            <input
              type="email"
              name="email"
              placeholder="Enter user email"
              class="form-input"
            />
             <input
              type="text"
              name="address"
              placeholder="Enter User Address"
              class="form-input"
            />
             <input
              type="number"
              name="phone"
              placeholder="Enter Contact number"
              class="form-input"
            />
            <button class="form-btn">Order now</button>
          </form>
        </div>
        <div class="col-sm-5">
          <h3>Total Amount: $3000</h3>
          <h4>Payement Method: <b>Cash on Delivery</b></h4>
        </div>
      </div>
    </div>
  `,
  styles: `
  
  .checkout 
  {
    h1{
      text-align:center;
      margin-top:15px;
      margin-bottom:15px;
    }
    h3{
      text-align:center;
      margin-top:40px;
      margin-bottom:20px;
    }
  }
  `,
})
export class Checkout {}
