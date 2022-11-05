import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTypeComponent } from './lista-type.component';

describe('ListaTypeComponent', () => {
  let component: ListaTypeComponent;
  let fixture: ComponentFixture<ListaTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
