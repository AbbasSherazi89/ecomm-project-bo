import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  template: `
    <nav>
      <h1>E-comm</h1>
      <div class="nav-search">
        <input type="text" placeholder="Enter Product name to search" />
        <button>Search</button>
      </div>
      <ul>
        <li><a routerLink="/seller-auth">Seller</a></li>
        <li><a routerLink="">Home</a></li>
        <li><a href="#">Login</a></li>
        <li><a href="#">Cart(0)</a></li>
      </ul>
    </nav>
  `,
  styles: `
  
  nav{
    display: flex;
    justify-content: space-between;
    // align-items: center;
    h1{
        color: blueviolet;
        margin: 0;
        padding: 0;
        font-size: 40px;
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
    padding-top: 15px;
    }
    a{
      text-decoration: none;
      color: blueviolet;
    }

  }
  `,
})
export class Header {}
