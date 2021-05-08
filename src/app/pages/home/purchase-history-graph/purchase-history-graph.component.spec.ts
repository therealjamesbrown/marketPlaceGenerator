import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseHistoryGraphComponent } from './purchase-history-graph.component';

describe('PurchaseHistoryGraphComponent', () => {
  let component: PurchaseHistoryGraphComponent;
  let fixture: ComponentFixture<PurchaseHistoryGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseHistoryGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseHistoryGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
