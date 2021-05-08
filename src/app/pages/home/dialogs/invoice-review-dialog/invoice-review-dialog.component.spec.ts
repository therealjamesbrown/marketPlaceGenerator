import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceReviewDialogComponent } from './invoice-review-dialog.component';

describe('InvoiceReviewDialogComponent', () => {
  let component: InvoiceReviewDialogComponent;
  let fixture: ComponentFixture<InvoiceReviewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceReviewDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceReviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
