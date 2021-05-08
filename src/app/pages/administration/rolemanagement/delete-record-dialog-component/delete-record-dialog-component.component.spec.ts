import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRecordDialogComponentComponent } from './delete-record-dialog-component.component';

describe('DeleteRecordDialogComponentComponent', () => {
  let component: DeleteRecordDialogComponentComponent;
  let fixture: ComponentFixture<DeleteRecordDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteRecordDialogComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRecordDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
