import { TestBed, inject } from '@angular/core/testing';

import { CompetenceService } from './competence.service';

describe('CompetenceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompetenceService]
    });
  });

  it('should be created', inject([CompetenceService], (service: CompetenceService) => {
    expect(service).toBeTruthy();
  }));
});
