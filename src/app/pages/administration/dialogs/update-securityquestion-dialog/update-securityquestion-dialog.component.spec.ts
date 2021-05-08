import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSecurityquestionDialogComponent } from './update-securityquestion-dialog.component';

describe('UpdateSecurityquestionDialogComponent', () => {
  let component: UpdateSecurityquestionDialogComponent;
  let fixture: ComponentFixture<UpdateSecurityquestionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSecurityquestionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSecurityquestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
