import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAreaComponent } from './lista-area.component';

describe('ListaAreaComponent', () => {
  let component: ListaAreaComponent;
  let fixture: ComponentFixture<ListaAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
