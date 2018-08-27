import { TestBed, inject } from '@angular/core/testing';

import { InfoMembreService } from './info-membre.service';

describe('InfoMembreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InfoMembreService]
    });
  });

  it('should be created', inject([InfoMembreService], (service: InfoMembreService) => {
    expect(service).toBeTruthy();
  }));
});
