import { TestBed, inject } from '@angular/core/testing';

import { EspaceService } from './espace.service';

describe('EspaceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EspaceService]
    });
  });

  it('should be created', inject([EspaceService], (service: EspaceService) => {
    expect(service).toBeTruthy();
  }));
});
