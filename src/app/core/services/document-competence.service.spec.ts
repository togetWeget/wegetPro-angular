import { TestBed, inject } from '@angular/core/testing';

import { DocumentCompetenceService } from './document-competence.service';

describe('DocumentCompetenceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DocumentCompetenceService]
    });
  });

  it('should be created', inject([DocumentCompetenceService], (service: DocumentCompetenceService) => {
    expect(service).toBeTruthy();
  }));
});
