import { TestBed, inject } from '@angular/core/testing';

import { CategorieBlockService } from './categorie-block.service';

describe('CategorieBlockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategorieBlockService]
    });
  });

  it('should be created', inject([CategorieBlockService], (service: CategorieBlockService) => {
    expect(service).toBeTruthy();
  }));
});
