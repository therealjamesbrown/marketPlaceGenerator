import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordProcessComponent } from './reset-password-process.component';

describe('ResetPasswordProcessComponent', () => {
  let component: ResetPasswordProcessComponent;
  let fixture: ComponentFixture<ResetPasswordProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPasswordProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
