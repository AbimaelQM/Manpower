import { TestBed } from '@angular/core/testing';

import { SkillLevelService } from './skill-level.service';

describe('SkillLevelService', () => {
  let service: SkillLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillLevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
