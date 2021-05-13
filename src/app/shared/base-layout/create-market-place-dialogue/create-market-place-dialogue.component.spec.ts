import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMarketPlaceDialogueComponent } from './create-market-place-dialogue.component';

describe('CreateMarketPlaceDialogueComponent', () => {
  let component: CreateMarketPlaceDialogueComponent;
  let fixture: ComponentFixture<CreateMarketPlaceDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMarketPlaceDialogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMarketPlaceDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
