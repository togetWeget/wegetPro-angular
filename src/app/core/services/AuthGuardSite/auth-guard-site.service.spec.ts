import { TestBed, inject } from '@angular/core/testing';

import { AuthGuardSiteService } from './auth-guard-site.service';

describe('AuthGuardSiteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardSiteService]
    });
  });

  it('should be created', inject([AuthGuardSiteService], (service: AuthGuardSiteService) => {
    expect(service).toBeTruthy();
  }));
});
