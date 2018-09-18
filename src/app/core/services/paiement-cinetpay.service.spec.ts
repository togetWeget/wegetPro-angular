import { TestBed, inject } from '@angular/core/testing';

import { PaiementCinetpayService } from './paiement-cinetpay.service';

describe('PaiementCinetpayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaiementCinetpayService]
    });
  });

  it('should be created', inject([PaiementCinetpayService], (service: PaiementCinetpayService) => {
    expect(service).toBeTruthy();
  }));
});
