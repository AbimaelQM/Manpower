import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCadastroPersonComponent } from './modal-cadastro-person.component';

describe('ModalCadastroPersonComponent', () => {
  let component: ModalCadastroPersonComponent;
  let fixture: ComponentFixture<ModalCadastroPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCadastroPersonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCadastroPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
