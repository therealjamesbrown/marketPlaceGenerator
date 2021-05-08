import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasegraphComponent } from './purchasegraph.component';

describe('PurchasegraphComponent', () => {
  let component: PurchasegraphComponent;
  let fixture: ComponentFixture<PurchasegraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasegraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasegraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
