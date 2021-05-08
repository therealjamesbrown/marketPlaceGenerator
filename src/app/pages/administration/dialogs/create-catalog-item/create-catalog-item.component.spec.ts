import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCatalogItemComponent } from './create-catalog-item.component';

describe('CreateCatalogItemComponent', () => {
  let component: CreateCatalogItemComponent;
  let fixture: ComponentFixture<CreateCatalogItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCatalogItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCatalogItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
