import { Component } from '@angular/core';
import { product } from '../../seller-type';
import { Router, RouterLink } from '@angular/router';
import { Product } from '../../services/product';

@Component({
  selector: 'app-product-list-wrapper',
  imports: [RouterLink],
  template: `
    <div class="product-list-wrapper my-4">
      <h1 class="mb-4">Trendy Products</h1>
      <div class="row g-4">
        @for(num of trendyProduct; track num){
        <div class="col-sm-6 col-md-4 col-lg-3 px-3">
          <div class="product-item h-100">
            <div class="product-image">
              <img
                routerLink="/details/{{ num.id }}"
                src="{{ num.image }}"
                alt="Product Image"
                class="img-fluid"
              />
            </div>
            <div class="product-details mt-3">
              <h6 class="head-name">{{ num.name }}</h6>
              <div class="product-price">
                <h6 class="mb-1">Price: {{ num.price }}</h6>
              </div>
              <div class="product-color">
                <h6 class="mb-0">Color: {{ num.color }}</h6>
              </div>
            </div>
            <div class="product-footer mt-3">
              <a
                routerLink="/details/{{ num.id }}"
                class="btn btn-outline-primary btn-sm"
                >View Details</a
              >
              <a href="" class="btn btn-primary btn-sm">Add to Cart</a>
            </div>
          </div>
        </div>
        }
      </div>
    </div>
  `,
  styles: `
  h1{
    margin:0px;
    padding:0px;
  }
  .product-item{
    border: 1px solid blueviolet;
    // border-radius: 8px;  /* Added border radius */
    h6{
      text-align:center;
    }
   .product-image{
      padding:10px;
    img{
      width:100%;
      height:300px;
      object-fit:contain;
    }
    }
    .product-details{
      border-top:1px solid blueviolet;
      border-bottom:1px solid blueviolet;
      padding:10px;
      .head-name{
      font-size:20px;
      font-weight:600;
      }
    }
    .product-footer{
      display:flex;
      justify-content:space-around;
      padding:10px;
      a{
        text-decoration:none;
    }
  }
}
  `,
})
export class ProductListWrapper {
  trendyProduct: undefined | product[];
  constructor(private _product: Product) {}
  ngOnInit() {
    this._product.getTrendyProducts().subscribe((res) => {
      this.trendyProduct = res;
    });
  }
}
