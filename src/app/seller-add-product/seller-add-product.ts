import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Product } from '../services/product';
import { product, sellerType } from '../seller-type';

@Component({
  selector: 'app-seller-add-product',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="add-product">
      <h1>Add New Product</h1>
      <p class="message-p">{{ productMessage }}</p>
      <form
        class="common-form"
        #addProduct="ngForm"
        (ngSubmit)="submit(addProduct.value)"
      >
        <input
          class="form-input"
          type="text"
          placeholder="Enter product name"
          name="name"
          ngModel
        />
        <input
          class="form-input"
          type="text"
          placeholder="Enter product price"
          name="price"
          ngModel
        />
        <input
          class="form-input"
          type="text"
          placeholder="Enter category of the product"
          name="category"
          ngModel
        />
        <input
          class="form-input"
          type="text"
          placeholder="Enter product color"
          name="color"
          ngModel
        />
        <textarea
          rows="5"
          type="text"
          name="description"
          ngModel
          placeholder="Enter product description"
        ></textarea>
        <input
          class="form-input"
          type="text"
          placeholder="Enter product image Url"
          name="image"
          ngModel
        />
        <button class="form-btn">Add Product</button>
      </form>
    </div>
  `,
  styles: `
  .add-product{
    text-align:center;
    h1{
      color: blueviolet;
      padding: 50px 0px 60px 0px;
      margin: 0px;
      font-size: 34px;
    }
  }

  `,
})
export class SellerAddProduct {
  productMessage: string | undefined;
  constructor(private _product: Product) {}
  submit(data: product) {
    this._product.addProduct(data).subscribe((res) => {
      if (res) {
        this.productMessage = 'Product added successfully!';
      }
    });

    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }
}
