import { TestBed, inject } from '@angular/core/testing';

import { EspaceGuardService } from './espace-guard.service';

describe('EspaceGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EspaceGuardService]
    });
  });

  it('should be created', inject([EspaceGuardService], (service: EspaceGuardService) => {
    expect(service).toBeTruthy();
  }));
});
