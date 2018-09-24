import { TestBed, inject } from '@angular/core/testing';

import { ChiffreService } from './chiffre.service';

describe('ChiffreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChiffreService]
    });
  });

  it('should be created', inject([ChiffreService], (service: ChiffreService) => {
    expect(service).toBeTruthy();
  }));
});
