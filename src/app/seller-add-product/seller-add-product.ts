import { Component, ViewChild } from '@angular/core';

import { FormsModule, NgForm } from '@angular/forms';
import { Product } from '../services/product';
import { product, sellerType } from '../seller-type';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="add-product">
      <h1>{{ isEditMode ? 'Update Product' : 'Add New Product' }}</h1>
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
        <button class="form-btn">
          {{ isEditMode ? 'Update Product' : 'Add Product' }}
        </button>
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
  @ViewChild('addProduct') addProductForm!: NgForm;
  productMessage: string | undefined;
  isEditMode = false;
  productId: string = '';
  constructor(
    private _product: Product,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id')!;
    this.isEditMode = !!this.productId;
    if (this.isEditMode) {
      this.loadProductData();
    }
  }

  loadProductData() {
    this._product.getProduct(this.productId).subscribe((product: product) => {
      console.log('Products', product);
      this.addProductForm.setValue({
        name: product.name,
        price: product.price,
        category: product.category,
        color: product.color,
        description: product.description,
        image: product.image,
      });
    });
  }

  submit(data: product) {
    if (this.isEditMode) {
      this.updateProduct(data);
    } else {
      this.addNewProduct(data);
    }
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }
  addNewProduct(data: product) {
    this._product.addProduct(data).subscribe((res) => {
      if (res) {
        this.productMessage = 'Product added successfully!';
        this.addProductForm.reset();
      }
    });
  }
  updateProduct(data: product) {
    this._product.updateProduct(this.productId, data).subscribe((res) => {
      if (res) {
        this.productMessage = 'Product Updated successfully!';
        this.addProductForm.reset();
        setTimeout(() => {
          this.router.navigate(['/seller-home']);
        }, 2000);
      }
    });
  }
}
