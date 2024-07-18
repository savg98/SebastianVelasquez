import { TestBed } from '@angular/core/testing';

import { FinancialProductsServiceService } from './financial-products-service.service';

describe('FinancialProductsServiceService', () => {
  let service: FinancialProductsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancialProductsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
