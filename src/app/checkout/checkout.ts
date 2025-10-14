import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../services/product';
import { cart, orderData } from '../seller-type';
import { Router } from '@angular/router';
@Component({
  selector: 'app-checkout',
  imports: [FormsModule],
  template: `
    <div class="checkout">
      <h1>Checkout</h1>
      <div class="row">
        <div class="col-sm-7">
          <h3>Add shipping Address</h3>
          <p class="message-p text-center">{{ orderMsg }}</p>
          <p class=""></p>
          <form
            #orderData="ngForm"
            class="common-form"
            (ngSubmit)="orderNow(orderData.value)"
          >
            <input
              type="email"
              name="email"
              placeholder="Enter user email"
              class="form-input"
              ngModel
            />
            <input
              type="text"
              name="address"
              placeholder="Enter User Address"
              class="form-input"
              ngModel
            />
            <input
              type="number"
              name="phone"
              placeholder="Enter Contact number"
              class="form-input"
              ngModel
            />
            <button class="form-btn">Order now</button>
          </form>
        </div>
        <div class="col-sm-5">
          <h3>Total Amount: $ {{ totalPrice }}</h3>
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
export class Checkout {
  totalPrice: number | undefined;
  cartData: cart[] | undefined;
  orderMsg: string | undefined;
  constructor(private _product: Product, private router: Router) {}
  ngOnInit() {
    this.totalPriceOfItems();
  }
  orderNow(data: orderData) {
    console.log(data);
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).body[0].id;
    if (this.totalPrice) {
      let orderData = {
        ...data,
        totalPrice: this.totalPrice,
        userId: userId,
        id: undefined,
      };

      this.cartData?.forEach((item) => {
        setTimeout(() => {
          item.id && this._product.deleteCartItems(item.id);
        }, 500);
      });

      this._product.orderNow(orderData).subscribe((res) => {
        if (res) {
          this.orderMsg = 'Order placed';
          setTimeout(() => {
            this.router.navigate(['/my-orders']);
            this.orderMsg = undefined;
          }, 3000);
        }
      });
    }
  }
  totalPriceOfItems() {
    // this._product.currentCart().subscribe((res) => {
    //   let price = 0;
    //   this.cartData = res;
    //   res.forEach((item) => {
    //     if (item.quantity) {
    //       price += this.parsePrice(item.price) * item.quantity;
    //     }
    //   });
    //   this.totalPrice = price + price / 10 + 200 - price / 10;
    //   console.log(this.totalPrice);
    // });
  }

  // function to convert the string to number
  parsePrice(priceString: string): number {
    return parseFloat(priceString.replace(/[^0-9.-]+/g, ''));
  }
}
