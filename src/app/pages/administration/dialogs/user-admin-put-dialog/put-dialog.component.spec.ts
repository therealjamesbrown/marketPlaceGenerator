import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutDialogComponent } from './put-dialog.component';

describe('PutDialogComponent', () => {
  let component: PutDialogComponent;
  let fixture: ComponentFixture<PutDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PutDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
