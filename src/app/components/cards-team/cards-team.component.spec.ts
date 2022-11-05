import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsTeamComponent } from './cards-team.component';

describe('CardsTeamComponent', () => {
  let component: CardsTeamComponent;
  let fixture: ComponentFixture<CardsTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsTeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
