import { TestBed, inject } from '@angular/core/testing';

import { TemoignageService } from './temoignage.service';

describe('TemoignageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TemoignageService]
    });
  });

  it('should be created', inject([TemoignageService], (service: TemoignageService) => {
    expect(service).toBeTruthy();
  }));
});
