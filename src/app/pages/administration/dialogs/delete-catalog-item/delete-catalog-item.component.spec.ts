import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCatalogItemComponent } from './delete-catalog-item.component';

describe('DeleteCatalogItemComponent', () => {
  let component: DeleteCatalogItemComponent;
  let fixture: ComponentFixture<DeleteCatalogItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCatalogItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCatalogItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
