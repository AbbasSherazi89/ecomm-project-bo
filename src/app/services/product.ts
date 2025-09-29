import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { product, sellerType } from '../seller-type';
@Injectable({
  providedIn: 'root'
})
export class Product {
    constructor(private http: HttpClient) {}

  addProduct(data:product){
    console.log("service logged: ", data);
    
    return this.http.post(`http://localhost:3000/products`,data);
  }
}
