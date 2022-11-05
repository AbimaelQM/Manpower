import { TestBed } from '@angular/core/testing';

import { SubTeamService } from './sub-team.service';

describe('SubTeamService', () => {
  let service: SubTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubTeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
