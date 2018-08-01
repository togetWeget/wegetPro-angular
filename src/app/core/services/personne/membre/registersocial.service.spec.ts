import { TestBed, inject } from '@angular/core/testing';

import { RegistersocialService } from './registersocial.service';

describe('RegistersocialService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegistersocialService]
    });
  });

  it('should be created', inject([RegistersocialService], (service: RegistersocialService) => {
    expect(service).toBeTruthy();
  }));
});
