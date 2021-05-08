import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewtransactiondialogComponent } from './viewtransactiondialog.component';

describe('ViewtransactiondialogComponent', () => {
  let component: ViewtransactiondialogComponent;
  let fixture: ComponentFixture<ViewtransactiondialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewtransactiondialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewtransactiondialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
