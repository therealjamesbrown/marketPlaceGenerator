import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogmanagementComponent } from './catalogmanagement.component';

describe('CatalogmanagementComponent', () => {
  let component: CatalogmanagementComponent;
  let fixture: ComponentFixture<CatalogmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogmanagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
