import { TestBed, inject } from '@angular/core/testing';

import { OutilsService } from './outils.service';

describe('OutilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OutilsService]
    });
  });

  it('should be created', inject([OutilsService], (service: OutilsService) => {
    expect(service).toBeTruthy();
  }));
});
