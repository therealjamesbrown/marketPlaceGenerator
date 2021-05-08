import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreVertDialogComponent } from './more-vert-dialog.component';

describe('MoreVertDialogComponent', () => {
  let component: MoreVertDialogComponent;
  let fixture: ComponentFixture<MoreVertDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreVertDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreVertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
