import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../services/product';
import { product } from '../seller-type';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule, FormsModule],
  template: `
    <nav>
      <h1><a routerLink="">E-comm</a></h1>
      @if (menuType === 'default') {
      <div class="nav-search">
        <input
          #searchInput
          type="text"
          [(ngModel)]="searchQuery"
          (keyup)="searchProduct($event)"
          placeholder="Enter Product name to search"
        />
        @if(searchResult?.length) {
        <ul class="search-items">
          @for(item of searchResult; track item.id){
          <li class="search-item" (click)="submitSearch(item.name)">
            {{ item.name }} - {{ item.price }}
          </li>
          }
        </ul>
        }
        <button (click)="submitSearch(searchInput.value)">Search</button>
      </div>
      }
      <div>
        @switch (menuType) { @case('default'){
        <ul>
          <li><a routerLink="/seller-auth">Seller</a></li>
          <li><a routerLink="">Home</a></li>
          <li><a routerLink="/user-auth">Login/SignUp</a></li>
          <li><a href="#">Cart(0)</a></li>
        </ul>
        } @case('seller'){
        <ul>
          <li><a routerLink="/seller-add-product">Add Product</a></li>
          <li><a routerLink="/seller-home">List</a></li>
          <li><a (click)="logout()">Logout</a></li>
          <li>
            <span>{{ sellerName | titlecase }}</span>
          </li>
        </ul>
        } }
      </div>
    </nav>
  `,
  styles: `
  
  nav{
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1{
        color: blueviolet;
        margin: 0;
        padding: 0;
        font-size: 40px;
        a{
          color:blueviolet;
          text-decoration:none;
        }
    }
    .nav-search{
          display: flex;
          flex: 1;
          margin: 0% 5%;
          position: relative;
          input{
                display: flex;
                flex: 1;
                border: 1px solid blueviolet;
                border-right: none;
                color: blueviolet;
                height:35px;            
          }
          button{
                border: 1px solid blueviolet;
                color: blueviolet;
                height:35px;
          }
          .search-items{
            position: absolute;
            display: list-item;
            top: 100%;
            left: 0;
            background: white;
            width: 100%;
            border: 1px solid blueviolet;
            padding: 0;
            margin: 0;
            list-style: none;
            z-index: 100;
            max-height: 300px;
            overflow-y: auto;
            li{
              color:blueviolet;
            }
          }
          .search-item {
            padding: 10px;
            border-bottom: 1px solid #eee;
            cursor: pointer;
            
            &:hover {
              background-color: #f8f9fa;
            }
            
            &:last-child {
              border-bottom: none;
            }
    }
  }
    ul{
          display: inline-flex;
          margin: 0px;
          padding: 0px;
          list-style: none;
    }
    li {
    padding-left: 15px;
    }
    a{
      text-decoration: none;
      cursor: pointer;
      color: blueviolet;
    }
    span{
      color: blueviolet;
    }

  }
  `,
})
export class Header {
  searchQuery: string = '';
  menuType: string = 'default';
  sellerName: string = '';
  searchResult: product[] | undefined;
  constructor(private route: Router, private _product: Product) {}

  ngOnInit() {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (val.url.includes('seller') && localStorage.getItem('seller')) {
          let sellerStore = localStorage.getItem('seller');
          let sellerData = null;
          if (sellerStore) {
            sellerData = JSON.parse(sellerStore);
          }

          this.menuType = 'seller';
          this.sellerName = sellerData[0].name;
        } else {
          this.menuType = 'default';
        }
      }
    });
  }

  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      if (element.value === '') {
        this.searchResult = [];
        return;
      }
      this._product
        .getSearchItems(element.value)
        .pipe(debounceTime(300), distinctUntilChanged())
        .subscribe((res) => {
          this.searchResult = res;
        });
    }
  }

  submitSearch(val: string) {
    if (this.searchResult && this.searchResult.length > 0) {
      this.route.navigate([`search/${val}`]);
      this.clearSearch();
    } else {
      alert('No search result found');
      this.clearSearch();
    }
  }
  clearSearch() {
    this.searchQuery = '';
    this.searchResult = [];
  }
}
