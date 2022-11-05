import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViewTeamComponent } from './modal-view-team.component';

describe('ModalViewTeamComponent', () => {
  let component: ModalViewTeamComponent;
  let fixture: ComponentFixture<ModalViewTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalViewTeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalViewTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
