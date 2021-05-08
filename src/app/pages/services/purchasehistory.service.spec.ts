import { TestBed } from '@angular/core/testing';

import { PurchasehistoryService } from './purchasehistory.service';

describe('PurchasehistoryService', () => {
  let service: PurchasehistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchasehistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
