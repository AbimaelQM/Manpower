import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSkillLevelComponent } from './lista-skillLevel.component';

describe('ListaSkillLevelComponent', () => {
  let component: ListaSkillLevelComponent;
  let fixture: ComponentFixture<ListaSkillLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaSkillLevelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaSkillLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
