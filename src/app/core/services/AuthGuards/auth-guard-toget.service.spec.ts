import { TestBed, inject } from '@angular/core/testing';

import { AuthGuardTogetService } from './auth-guard-toget.service';

describe('AuthGuardTogetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardTogetService]
    });
  });

  it('should be created', inject([AuthGuardTogetService], (service: AuthGuardTogetService) => {
    expect(service).toBeTruthy();
  }));
});
