import { Component } from '@angular/core';

@Component({
  selector: 'app-cart-page',
  imports: [],
  template: `
    <div class="cart-page">
      <h1>My Cart Details</h1>
      <div class="row">
        <div class="col-sm-8 details">
          @for(item of [1,2,3,4,5]; track item){

          <ul>
            <li>
              <img
                src="https://media.umbraco.io/suzuki-gb/frvbbyh2/hayabusa_m5_c0t.png?width=828&quality=75&format=webp"
                alt=""
              />
            </li>
            <li>Product Name: Suzuki Bikes UK</li>
            <li>Price: $2000</li>
            <li><button class="btn btn-outline-danger">Remove</button></li>
          </ul>
          }
        </div>
        <div class="col-sm-4 summary">
          <h3>Summary</h3>
          <ul>
            <li><span>Amount: </span><span>$2000</span></li>
            <li><span>Tax: </span><span>10%</span></li>
            <li><span>Delivery: </span><span>$150</span></li>
            <li><span>Discount: </span><span>$50</span></li>
            <li>
              <span><h4>Total:</h4></span><span><h4>$2200</h4></span>
            </li>
          </ul>
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
    }

    .summary{
      h3{
        text-align:center;
      }
      ul{
        border: 1px solid #ddd;
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
export class CartPage {}
