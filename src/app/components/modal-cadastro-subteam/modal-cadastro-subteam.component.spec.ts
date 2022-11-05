import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCadastroSubteamComponent } from './modal-cadastro-subteam.component';

describe('ModalCadastroSubteamComponent', () => {
  let component: ModalCadastroSubteamComponent;
  let fixture: ComponentFixture<ModalCadastroSubteamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCadastroSubteamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCadastroSubteamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
