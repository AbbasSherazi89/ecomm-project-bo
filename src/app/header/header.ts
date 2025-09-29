import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  template: `
    <nav>
      <h1><a routerLink="">E-comm</a></h1>
      @if (menuType === 'default') {
      <div class="nav-search">
        <input type="text" placeholder="Enter Product name to search" />
        <button>Search</button>
      </div>
      }
      <div>
        @switch (menuType) { @case('default'){
        <ul>
          <li><a routerLink="/seller-auth">Seller</a></li>
          <li><a routerLink="">Home</a></li>
          <li><a href="#">Login</a></li>
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
                height:39px;
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
  menuType: string = 'default';
  sellerName: string = '';
  constructor(private route: Router) {}

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
}
