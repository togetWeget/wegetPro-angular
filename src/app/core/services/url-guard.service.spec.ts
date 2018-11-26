import { TestBed, inject } from '@angular/core/testing';

import { UrlGuardService } from './url-guard.service';

describe('UrlGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UrlGuardService]
    });
  });

  it('should be created', inject([UrlGuardService], (service: UrlGuardService) => {
    expect(service).toBeTruthy();
  }));
});
