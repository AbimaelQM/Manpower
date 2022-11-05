import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCadastroSkillComponent } from './modal-cadastro-skill.component';

describe('ModalCadastroSkillComponent', () => {
  let component: ModalCadastroSkillComponent;
  let fixture: ComponentFixture<ModalCadastroSkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCadastroSkillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCadastroSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
