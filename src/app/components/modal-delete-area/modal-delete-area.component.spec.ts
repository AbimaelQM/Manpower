import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteAreaComponent } from './modal-delete-area.component';

describe('ModalDeleteAreaComponent', () => {
  let component: ModalDeleteAreaComponent;
  let fixture: ComponentFixture<ModalDeleteAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDeleteAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDeleteAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
