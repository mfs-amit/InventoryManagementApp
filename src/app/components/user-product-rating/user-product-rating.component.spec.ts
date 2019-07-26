import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProductRatingComponent } from './user-product-rating.component';

describe('UserProductRatingComponent', () => {
  let component: UserProductRatingComponent;
  let fixture: ComponentFixture<UserProductRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProductRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProductRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
