import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProductInformationComponent } from './user-product-information.component';

describe('UserProductInformationComponent', () => {
  let component: UserProductInformationComponent;
  let fixture: ComponentFixture<UserProductInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProductInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProductInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
