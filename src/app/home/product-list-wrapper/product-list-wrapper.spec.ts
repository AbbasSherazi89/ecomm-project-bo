import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListWrapper } from './product-list-wrapper';

describe('ProductListWrapper', () => {
  let component: ProductListWrapper;
  let fixture: ComponentFixture<ProductListWrapper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListWrapper]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListWrapper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
