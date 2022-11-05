import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCadastroJobComponent } from './modal-cadastro-job.component';

describe('ModalCadastroJobComponent', () => {
  let component: ModalCadastroJobComponent;
  let fixture: ComponentFixture<ModalCadastroJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCadastroJobComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCadastroJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
