import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCadastroOthersComponent } from './modal-cadastro-others.component';

describe('ModalCadastroOthersComponent', () => {
  let component: ModalCadastroOthersComponent;
  let fixture: ComponentFixture<ModalCadastroOthersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCadastroOthersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCadastroOthersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
