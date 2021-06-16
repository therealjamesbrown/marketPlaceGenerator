import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaypalCommerceComponent } from './paypal-commerce.component';

describe('PaypalCommerceComponent', () => {
  let component: PaypalCommerceComponent;
  let fixture: ComponentFixture<PaypalCommerceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaypalCommerceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaypalCommerceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
