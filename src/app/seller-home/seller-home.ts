import { Component } from '@angular/core';
import { Product } from '../services/product';
import { product } from '../seller-type';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-seller-home',
  imports: [CommonModule],
  template: ` 
  
  <div class="product-list">
    <h1>Product List</h1>
    <table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Price</th>
          <th>Color</th>
          <th>Category</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of productList">
          <td><img src="{{item.image}}" alt="Image of the {{item.name}}"></td>
          <td>{{item.name}}</td>
          <td>{{item.price}}</td>
          <td>{{item.color}}</td>
          <td>{{item.category}}</td>
          <td>{{item.description}}</td>
        </tr>
      </tbody>
    </table>
  </div>
  `,
  styles: `
  
  table{
    text-align:left;
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
  }
  `,
})
export class SellerHome {
  productList:undefined|product[];
  constructor(private _product: Product) {}

  ngOnInit() {
    this._product.productList().subscribe((res) => {
      console.log(res);
      if(res){
        this.productList=res;
      }
    });
  }
  // getProduct(){

  // }
}
