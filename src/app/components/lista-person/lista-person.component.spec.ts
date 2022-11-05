import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPersonComponent } from './lista-person.component';

describe('ListaPersonComponent', () => {
  let component: ListaPersonComponent;
  let fixture: ComponentFixture<ListaPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaPersonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
