import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditAreaComponent } from './modal-edit-area.component';

describe('ModalEditAreaComponent', () => {
  let component: ModalEditAreaComponent;
  let fixture: ComponentFixture<ModalEditAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
