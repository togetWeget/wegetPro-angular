import { TestBed, inject } from '@angular/core/testing';

import { RequestChatroomService } from './request-chatroom.service';

describe('RequestChatroomService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestChatroomService]
    });
  });

  it('should be created', inject([RequestChatroomService], (service: RequestChatroomService) => {
    expect(service).toBeTruthy();
  }));
});
