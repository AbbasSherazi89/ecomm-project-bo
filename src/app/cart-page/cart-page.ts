import { Component } from '@angular/core';
import { cart, priceSummary, product } from '../seller-type';
import { Product } from '../services/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  imports: [],
  template: `
    <div class="cart-page">
      <h1>My Cart Details</h1>
      <div class="row">
        <div class="col-sm-8 details">
          @for(item of cartData; track item){

          <ul>
            <li>
              <img src="{{ item.image }}" alt="" />
            </li>
            <li>Product Name: {{ item.name }}</li>
            <li>Price: {{ item.price }}</li>
            <li>
              <button
                class="btn btn-outline-danger"
                (click)="removetoCartList(item)"
              >
                Remove
              </button>
            </li>
          </ul>
          }
        </div>
        <div class="col-sm-4 summary">
          <h3>Summary</h3>
          @if(cartSummary){

          <ul>
            <li>
              <span>Amount: </span><span>$ {{ cartSummary.price }}</span>
            </li>
            <li>
              <span>Tax: </span><span>$ {{ cartSummary.tax }}</span>
            </li>
            <li>
              <span>Delivery Charges: </span
              ><span>$ {{ cartSummary.deliveryCharges }}</span>
            </li>
            <li>
              <span>Discount: </span><span>$ {{ cartSummary.discount }}</span>
            </li>
            <li>
              <span><h4>Total:</h4></span
              ><span
                ><h4>$ {{ cartSummary.total }}</h4></span
              >
            </li>
            <button
              (click)="checkout()"
              class="btn btn-outline-primary w-100 mt-3"
            >
              Checkout
            </button>
          </ul>
          }
        </div>
      </div>
    </div>
  `,
  styles: `
  .cart-page{
    margin-top:40px;
    margin-bottom:50px;
    h1{
      text-align:center;
    }
    .details{
      border:1px solid #ddd;
      border-radius:10px;
      img{
        height:100px;
      }
      ul{
        list-style: none;
        padding: 10px;
        margin: 0px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ddd;
        margin-bottom: 10px;
      }
      ul:last-child {
        border-bottom: none;
            }
    }

    .summary{
      h3{
        text-align:center;
      }
      ul{
        border: 1px solid #ddd;
        border-radius:10px;
        padding: 20px;
        list-style:none;
      }
      li{
        display:flex;
        justify-content:space-between;
      }
    }
  }
  `,
})
export class CartPage {
  cartData: undefined | cart[];
  cartSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    deliveryCharges: 0,
    total: 0,
  };
  constructor(private _product: Product, private router:Router) {}
  ngOnInit() {
    this.getUserCartList();
  }
  getUserCartList() {
    this._product.currentCart().subscribe((res) => {
      this.cartData = res;
      let price = 0;
      res.forEach((item) => {
        if (item.quantity) {
          price += this.parsePrice(item.price) * item.quantity;
        }
      });
      this.updateCartSummary(price);
    });
  }
  updateCartSummary(price: number): void {
    const discount = price / 10;
    const tax = price / 10;
    const delivery = 200;

    this.cartSummary = {
      price: price,
      discount: discount,
      tax: tax,
      deliveryCharges: delivery,
      total: price + tax + delivery - discount,
    };
  }
  removetoCartList(item: cart) {
    if (item.id) {
      this._product.removeToCart(item.id).subscribe((res) => {
        this.getUserCartList();
      });
    }
  }
  // function to convert the string to number
  parsePrice(priceString: string): number {
    return parseFloat(priceString.replace(/[^0-9.-]+/g, ''));
  }

  checkout() {
    this.router.navigate(['/checkout'])
  }
}
