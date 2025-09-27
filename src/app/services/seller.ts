import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { sellerType } from '../seller-type';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  constructor(private http: HttpClient) {}
  
  signUpSeller(data: sellerType) {
   return this.http.post('http://localhost:3000/seller', data);
  }
}
