import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillLevelFormComponent } from './skill-level-form.component';

describe('SkillLevelFormComponent', () => {
  let component: SkillLevelFormComponent;
  let fixture: ComponentFixture<SkillLevelFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillLevelFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillLevelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
