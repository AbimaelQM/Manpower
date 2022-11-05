import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCadastroAreaComponent } from './modal-cadastro-area.component';

describe('ModalCadastroAreaComponent', () => {
  let component: ModalCadastroAreaComponent;
  let fixture: ComponentFixture<ModalCadastroAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCadastroAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCadastroAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
