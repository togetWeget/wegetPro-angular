import { TestBed, inject } from '@angular/core/testing';

import { AbonnesService } from './abonnes.service';

describe('AbonnesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AbonnesService]
    });
  });

  it('should be created', inject([AbonnesService], (service: AbonnesService) => {
    expect(service).toBeTruthy();
  }));
});
