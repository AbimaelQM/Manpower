import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAddressComponent } from './lista-address.component';

describe('ListaAddressComponent', () => {
  let component: ListaAddressComponent;
  let fixture: ComponentFixture<ListaAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
