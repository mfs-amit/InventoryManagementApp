import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDistributorsComponent } from './product-distributors.component';

describe('ProductDistributorsComponent', () => {
  let component: ProductDistributorsComponent;
  let fixture: ComponentFixture<ProductDistributorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDistributorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDistributorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
