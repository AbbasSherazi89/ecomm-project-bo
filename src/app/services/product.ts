import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { cart, orderData, product, sellerType } from '../seller-type';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class Product {
  cartData = new EventEmitter<product[]>();
  constructor(private http: HttpClient) {}

  addProduct(data: product) {
    return this.http.post(`http://localhost:3000/products`, data);
  }
  productList() {
    let sellerData = localStorage.getItem('seller')!;
    let sellerId = JSON.parse(sellerData)[0].id;
    return this.http.get<product[]>(
      `http://localhost:3000/products?sellerId=${sellerId}`
    );
  }
  deleteProduct(id: any) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }
  updateProduct(id: any, data: product) {
    return this.http.put(`http://localhost:3000/products/${id}`, data);
  }
  getProduct(id: string) {
    return this.http.get<product>(`http://localhost:3000/products/${id}`);
  }
  getPopularProducts() {
    return this.http.get<product[]>(`http://localhost:3000/products?_limit=3`);
  }
  getTrendyProducts() {
    return this.http.get<product[]>(`http://localhost:3000/products?_limit=8`);
  }
  getSearchItems(query: string) {
    return this.http.get<any[]>('http://localhost:3000/products').pipe(
      map((products) => {
        const lowerQuery = query.toLowerCase();
        return products.filter(
          (product) =>
            product.name.toLowerCase().includes(lowerQuery) ||
            product.category.toLowerCase().includes(lowerQuery) ||
            product.description.toLowerCase().includes(lowerQuery) ||
            product.color.toLowerCase().includes(lowerQuery)
        );
      })
    );
  }

  localAddtoCart(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }
  removeItemFromCart(pId: string) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => {
        return pId !== item.id;
      });
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }
  addToCart(cartData: cart) {
    return this.http.post(`http://localhost:3000/cart`, cartData);
  }
  getCartList(userId: string) {
    return this.http
      .get<product[]>(`http://localhost:3000/cart?userId=${userId}`, {
        observe: 'response',
      })
      .subscribe((res) => {
        if (res && res.body) {
          this.cartData.emit(res.body);
        }
      });
  }
  removeToCart(cartId: string) {
    return this.http.delete(`http://localhost:3000/cart/${cartId}`);
  }
  currentCart(userData: cart) {
    return this.http.get<cart[]>(
      `http://localhost:3000/cart?userId=${userData.id}`
    );
  }
  orderNow(data: orderData) {
    return this.http.post(`http://localhost:3000/orders`, data);
  }
  orderList() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore).body[0];
    return this.http.get<orderData[]>(
      `http://localhost:3000/orders?userId=${userData.id}`
    );
  }

  deleteCartItems(cartId: string) {
    return this.http
      .delete(`http://localhost:3000/cart/` + cartId)
      .subscribe((res) => {
        this.cartData.emit([]);
      });
  }

  cancelOrder(orderId: string) {
    return this.http.delete(`http://localhost:3000/orders/${orderId}`);
  }
}
