import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllTransactionsDialogComponent } from './view-all-transactions-dialog.component';

describe('ViewAllTransactionsDialogComponent', () => {
  let component: ViewAllTransactionsDialogComponent;
  let fixture: ComponentFixture<ViewAllTransactionsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllTransactionsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllTransactionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
