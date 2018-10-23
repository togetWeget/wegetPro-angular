import { TestBed, inject } from '@angular/core/testing';

import { ConnexionUpService } from './connexion-up.service';

describe('ConnexionUpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConnexionUpService]
    });
  });

  it('should be created', inject([ConnexionUpService], (service: ConnexionUpService) => {
    expect(service).toBeTruthy();
  }));
});
