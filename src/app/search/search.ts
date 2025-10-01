import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  imports: [],
  template: `
  @for(num of [1,2,3,4,5]; track num){
    <div class="row search-item">
      <div class="col-sm-3 "> <img src="https://danytech.com.pk/cdn/shop/files/Evolution-ThumbnailImage-2_3_copy.png?v=1731505750" alt=""> </div>
      <div class="col-sm-8 details">
        <h6> Product name</h6>
        <p><b>Price: $232</b></p>
        <p><span>color:Red</span> <span>Category: mobile</span></p>
        <p>Search page static ui</p>
      </div>
    </div>
  }
  `,
  styles: `
  
  .search-item {
    width: 800px;
    margin: 25px auto;
    border-top: 1px solid #ccc; 
    padding: 10px 0;  
    img{
      width:100%;
      height:150px;
    }
    h6{
      font-size:20px;
      color:blueviolet;
    }
    p{
      margin-bottom:5px;
    }
    span{
      margin-right:10px;
    }
}
  `
})
export class Search {

}
