import { Component } from '@angular/core';
import { orderData } from '../seller-type';
import { Product } from '../services/product';

@Component({
  selector: 'app-my-orders',
  imports: [],
  template: `
    <div class="my-orders">
      <h1>My Orders</h1>
      <div class="row py-2 border-bottom">
        <div class="col-sm-3"><span>Orders</span></div>
        <div class="col-sm-2"><span>Order Id</span></div>
        <div class="col-sm-2"><span>Price</span></div>
        <div class="col-sm-2"><span>Status</span></div>
        <div class="col-sm-2"><span>Cancel Order</span></div>
      </div>
      @for (item of [1,2,3,4]; track item) {
      <div class="row py-2 border-bottom d-flex align-items-center">
        <div class="col-sm-3">
          <p>
            <img
              src="https://hyundai-nishat.com/wp-content/uploads/2025/01/DN8-FL-Right-Side-Transparent-512x280-1.webp "
              alt="Order image"
            />
          </p>
        </div>
        <div class="col-sm-2"><p># 1232</p></div>
        <div class="col-sm-2"><p>Inprogress</p></div>
        <div class="col-sm-2"><p>2345</p></div>

        <div class="col-sm-2">
          <button class="form-btn">Cancel order</button>
        </div>
      </div>
      }
    </div>
  `,
  styles: `
  
  .my-orders{
    h1{
      text-align:center;
      margin: 30px 0px;
    }
    img{
      height:120px;
    }
    span{
      font-size:16px;
      font-weight:600;
    }
  }
  `,
})
export class MyOrders {
  orderList: orderData[] | undefined;
  constructor(private _product: Product) {}

  ngOnInit() {
    this._product.orderList().subscribe((res) => {
      console.log(res);
    });
  }
}
