import { TestBed } from '@angular/core/testing';

import { MessagesBarService } from './messages-bar.service';

describe('MessagesBarService', () => {
  let service: MessagesBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagesBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
