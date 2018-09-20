import { TestBed, inject } from '@angular/core/testing';

import { ChatLiasonService } from './chat-liason.service';

describe('ChatLiasonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatLiasonService]
    });
  });

  it('should be created', inject([ChatLiasonService], (service: ChatLiasonService) => {
    expect(service).toBeTruthy();
  }));
});
