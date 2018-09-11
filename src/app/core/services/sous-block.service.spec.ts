import { TestBed, inject } from '@angular/core/testing';

import { SousBlockService } from './sous-block.service';

describe('SousBlockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SousBlockService]
    });
  });

  it('should be created', inject([SousBlockService], (service: SousBlockService) => {
    expect(service).toBeTruthy();
  }));
});
