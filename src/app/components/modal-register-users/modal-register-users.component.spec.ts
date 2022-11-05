import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRegisterUsersComponent } from './modal-register-users.component';

describe('ModalRegisterUsersComponent', () => {
  let component: ModalRegisterUsersComponent;
  let fixture: ComponentFixture<ModalRegisterUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRegisterUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalRegisterUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
