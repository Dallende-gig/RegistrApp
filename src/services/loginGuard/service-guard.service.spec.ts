import { TestBed } from '@angular/core/testing';

import { ServiceGuardService } from './service-guard.service';

describe('ServiceGuardService', () => {
  let service: ServiceGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
