import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSecurityquestionDialogComponent } from './delete-securityquestion-dialog.component';

describe('DeleteSecurityquestionDialogComponent', () => {
  let component: DeleteSecurityquestionDialogComponent;
  let fixture: ComponentFixture<DeleteSecurityquestionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSecurityquestionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSecurityquestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
