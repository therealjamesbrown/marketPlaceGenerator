import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMarketPlaceComponent } from './create-market-place.component';

describe('CreateMarketPlaceComponent', () => {
  let component: CreateMarketPlaceComponent;
  let fixture: ComponentFixture<CreateMarketPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMarketPlaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMarketPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
