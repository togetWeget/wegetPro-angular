import { TestBed, inject } from '@angular/core/testing';

import { LoginsocialService } from './loginsocial.service';

describe('LoginsocialService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginsocialService]
    });
  });

  it('should be created', inject([LoginsocialService], (service: LoginsocialService) => {
    expect(service).toBeTruthy();
  }));
});
