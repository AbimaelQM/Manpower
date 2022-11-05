import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCadastroTeamComponent } from './modal-cadastro-team.component';

describe('ModalCadastroTeamComponent', () => {
  let component: ModalCadastroTeamComponent;
  let fixture: ComponentFixture<ModalCadastroTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCadastroTeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCadastroTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
