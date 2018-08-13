import { TestBed, inject } from '@angular/core/testing';

import { AbonnementService } from './abonnement.service';

describe('AbonnementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AbonnementService]
    });
  });

  it('should be created', inject([AbonnementService], (service: AbonnementService) => {
    expect(service).toBeTruthy();
  }));
});
