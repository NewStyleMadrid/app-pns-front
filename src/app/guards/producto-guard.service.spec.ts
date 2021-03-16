import { TestBed } from '@angular/core/testing';

import { ProductoGuardService } from './producto-guard.service';

describe('ProductoGuardService', () => {
  let service: ProductoGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductoGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
