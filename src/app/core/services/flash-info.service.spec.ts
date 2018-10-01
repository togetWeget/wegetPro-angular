import { TestBed, inject } from '@angular/core/testing';

import { FlashInfoService } from './flash-info.service';

describe('FlashInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlashInfoService]
    });
  });

  it('should be created', inject([FlashInfoService], (service: FlashInfoService) => {
    expect(service).toBeTruthy();
  }));
});
