import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PponboardingCompleteComponent } from './pponboarding-complete.component';

describe('PponboardingCompleteComponent', () => {
  let component: PponboardingCompleteComponent;
  let fixture: ComponentFixture<PponboardingCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PponboardingCompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PponboardingCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
