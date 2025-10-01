import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../services/product';
import { product } from '../seller-type';
@Component({
  selector: 'app-search',
  imports: [],
  template: `
    @for(item of searchResult; track item.id){
    <div class="row search-item">
      <div class="col-sm-3 ">
        <img src="{{ item.image }}" alt="" />
      </div>
      <div class="col-sm-8 details">
        <h6>{{ item.name }}</h6>
        <p>
          <b>Price: {{ item.price }}</b>
        </p>
        <p>
          <span>color: {{ item.color }}</span>
          <span>Category: {{ item.category }}</span>
        </p>
        <p>{{ item.description }}</p>
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
  `,
})
export class Search {
  searchQuery: string = '';
  searchResult: product[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _product: Product
  ) {}
  ngOnInit() {
    this.searchQuery = this.route.snapshot.paramMap.get('query') || '';
    this.getSearchData(this.searchQuery);
  }

  getSearchData(query: string) {
    this._product.getSearchItems(query).subscribe((res) => {
      this.searchResult = res;
    });
  }
}
