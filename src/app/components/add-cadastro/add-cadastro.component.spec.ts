import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCadastroComponent } from './add-cadastro.component';

describe('AddCadastroComponent', () => {
  let component: AddCadastroComponent;
  let fixture: ComponentFixture<AddCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCadastroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
