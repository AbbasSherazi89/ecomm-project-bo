import { Component } from '@angular/core';
import { Product } from '../services/product';
import { product } from '../seller-type';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductListWrapper } from './product-list-wrapper/product-list-wrapper';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [NgbCarouselModule, ProductListWrapper, RouterLink],
  template: `
    <div class="carousel-container mt-5">
      @if (popularProducts) {
      <ngb-carousel>
        @for(item of popularProducts; track item){

        <ng-template ngbSlide>
          <div class="picsum-img-wrapper">
            <img
              routerLink="/details/{{ item.id }}"
              class="product-image"
              [src]="item.image"
              alt="Random first slide"
            />
          </div>
          <div class="carousel-caption">
            <h3>{{ item.name }}</h3>
            <p>{{ item.description }}</p>
          </div>
        </ng-template>
        }
      </ngb-carousel>
      }
    </div>
    <div>
      <app-product-list-wrapper />
    </div>
  `,
  styles: `
  ngb-carousel{
    background:rgba(0,0,0,0.2);
  }
  .product-image{
    object-fit:contain;
    width:100%;
    height:600px;
  }

  `,
})
export class Home {
  popularProducts: undefined | product[];
  constructor(private _product: Product) {}

  ngOnInit() {
    this._product.getPopularProducts().subscribe((res) => {
      this.popularProducts = res;
    });
  }
}
