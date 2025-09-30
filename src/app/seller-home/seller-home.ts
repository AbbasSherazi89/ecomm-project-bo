import { Component } from '@angular/core';
import { Product } from '../services/product';
import { product } from '../seller-type';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-seller-home',
  imports: [CommonModule],
  template: `
    <div class="product-list">
      <h1>Product List</h1>
      <p class="error-p">{{ productMessage }}</p>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Color</th>
            <th>Category</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of productList">
            <td>
              <img src="{{ item.image }}" alt="Image of the {{ item.name }}" />
            </td>
            <td>{{ item.name }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.color }}</td>
            <td>{{ item.category }}</td>
            <td>{{ item.description }}</td>
            <td class="action-icons">
              <i class="material-icons" style="color: red;" (click)="deleteProduct(item.id)"
                >delete</i
              >
              <i class="material-icons" style="color: green;" (click)="updateProduct(item.id)"
                >update</i
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: `
  
  table{
    text-align:center;
    color:blueviolet;
    border-collapse:collapse;

    img{
      width:100px;
      height:100px;
    }
    th, td{
      border:1px solid blueviolet;
      padding:10px;
      min-width:160px;
    }
    .action-icons i{
      cursor:pointer;
      margin-right:10px;
    }
  }
  `,
})
export class SellerHome {
  productList: product[] = [];
  productMessage: undefined | string;
  constructor(private _product: Product, private router:Router) {}

  ngOnInit() {
    this.getProductList();
  }

  getProductList() {
    this._product.productList().subscribe((res) => {
      console.log(res);
      if (res) {
        this.productList = res;
      }
    });
  }

  deleteProduct(id: string) {
    this._product.deleteProduct(id).subscribe((res) => {
      this.productList = this.productList.filter((item) => item.id !== id);
      this.productMessage = 'Product deleted successfully!';
    });

    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }

  updateProduct(id: string) {
    this.router.navigate(['/seller-add-product', id]);
  }
}
