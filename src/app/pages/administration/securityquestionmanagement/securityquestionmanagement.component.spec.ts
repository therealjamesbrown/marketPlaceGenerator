import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityquestionmanagementComponent } from './securityquestionmanagement.component';

describe('SecurityquestionmanagementComponent', () => {
  let component: SecurityquestionmanagementComponent;
  let fixture: ComponentFixture<SecurityquestionmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityquestionmanagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityquestionmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
