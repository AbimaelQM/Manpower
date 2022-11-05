import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaModalityComponent } from './lista-modality.component';

describe('ListaModalityComponent', () => {
  let component: ListaModalityComponent;
  let fixture: ComponentFixture<ListaModalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaModalityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaModalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
