import { TestBed, inject } from '@angular/core/testing';

import { PhotoSousblockService } from './photo-sousblock.service';

describe('PhotoSousblockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhotoSousblockService]
    });
  });

  it('should be created', inject([PhotoSousblockService], (service: PhotoSousblockService) => {
    expect(service).toBeTruthy();
  }));
});
