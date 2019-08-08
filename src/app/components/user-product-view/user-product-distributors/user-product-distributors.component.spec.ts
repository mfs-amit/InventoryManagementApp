import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProductDistributorsComponent } from './user-product-distributors.component';

describe('UserProductDistributorsComponent', () => {
  let component: UserProductDistributorsComponent;
  let fixture: ComponentFixture<UserProductDistributorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProductDistributorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProductDistributorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
