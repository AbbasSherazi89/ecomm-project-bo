import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../services/product';
import { product } from '../seller-type';

@Component({
  selector: 'app-product-details',
  imports: [],
  template: `
    @if(productData){
    <div class="row product-details">
      <div class="col-sm-6">
        <img src="{{ productData.image }}}" alt="" class="img-fluid" />
      </div>
      <div class="col-sm-6">
        <div class="details">
          <h1>{{ productData.name }}</h1>
          <h3>Price: {{ productData.price }}</h3>
          <div class="d-flex align-items-center">
            Color:
            <h3
              class="product-color ms-3"
              [style.backgroundColor]="productData.color"
            ></h3>
          </div>
          <h6>Category: {{ productData.category }}</h6>
          <h6>Description: {{ productData.description }}</h6>
          <button class="btn btn-outline-primary btn-sm">Buy now</button>
          <button class="btn btn-primary btn-sm ms-2" (click)="addToCart()">
            Add to cart
          </button>
          <div class="quantity-group my-2">
            <button
              class="btn btn-primary rounded-0 py-2"
              (click)="handleQuantity('min')"
            >
              -
            </button>
            <input
              class="py-1 rounded-0"
              type="text"
              value="{{ productQuantity }}"
            />
            <button
              class="btn btn-primary rounded-0 py-2"
              (click)="handleQuantity('plus')"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
    }
  `,
  styles: `
  
  .product-details{
    margin: 80px 0px;
    img{
      width:100%;
      height:400px;
      object-fit:contain;
    }
    .product-color{
      border: 1px solid #000;
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  `,
})
export class ProductDetails {
  productId: string = '';
  productData: undefined | product;
  productQuantity: number = 1;
  constructor(private route: ActivatedRoute, private _product: Product) {}

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('productId') || '';

    if (this.productId) {
      this._product.getProduct(this.productId).subscribe((res) => {
        this.productData = res;
      });
    }
  }
  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }

  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this._product.localAddtoCart(this.productData);
      }
    }
  }
}
