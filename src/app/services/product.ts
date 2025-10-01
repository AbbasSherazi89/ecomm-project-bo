import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { product, sellerType } from '../seller-type';
@Injectable({
  providedIn: 'root',
})
export class Product {
  constructor(private http: HttpClient) {}

  addProduct(data: product) {
    return this.http.post(`http://localhost:3000/products`, data);
  }
  productList(){
    return this.http.get<product[]>(`http://localhost:3000/products`);
  }
  deleteProduct(id:any){
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }
    updateProduct(id:any, data:product){
    return this.http.put(`http://localhost:3000/products/${id}`,data);
  }
  getProduct(id:string){
    return this.http.get<product>(`http://localhost:3000/products/${id}`);
  }
  getPopularProducts(){
    return this.http.get<product[]>(`http://localhost:3000/products?_limit=3`);
  }
   getTrendyProducts(){
    return this.http.get<product[]>(`http://localhost:3000/products?_limit=8`);
  }
}
