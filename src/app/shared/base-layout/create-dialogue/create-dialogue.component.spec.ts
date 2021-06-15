import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDialogueComponent } from './create-dialogue.component';

describe('CreateDialogueComponent', () => {
  let component: CreateDialogueComponent;
  let fixture: ComponentFixture<CreateDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDialogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
