import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSecurityquestionDialogComponent } from './create-securityquestion-dialog.component';

describe('CreateSecurityquestionDialogComponent', () => {
  let component: CreateSecurityquestionDialogComponent;
  let fixture: ComponentFixture<CreateSecurityquestionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSecurityquestionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSecurityquestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
