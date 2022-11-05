import { TestBed } from '@angular/core/testing';

import { PersonSkillService } from './person-skill.service';

describe('PersonSkillService', () => {
  let service: PersonSkillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonSkillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
