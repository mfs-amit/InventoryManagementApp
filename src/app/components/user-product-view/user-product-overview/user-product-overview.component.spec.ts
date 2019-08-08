import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProductOverviewComponent } from './user-product-overview.component';

describe('UserProductOverviewComponent', () => {
  let component: UserProductOverviewComponent;
  let fixture: ComponentFixture<UserProductOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProductOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProductOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
