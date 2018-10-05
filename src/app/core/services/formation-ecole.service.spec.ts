import { TestBed, inject } from '@angular/core/testing';

import { FormationEcoleService } from './formation-ecole.service';

describe('FormationEcoleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormationEcoleService]
    });
  });

  it('should be created', inject([FormationEcoleService], (service: FormationEcoleService) => {
    expect(service).toBeTruthy();
  }));
});
