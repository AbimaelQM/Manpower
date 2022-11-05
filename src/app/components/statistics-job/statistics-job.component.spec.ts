import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsJobComponent } from './statistics-job.component';

describe('StatisticsJobComponent', () => {
  let component: StatisticsJobComponent;
  let fixture: ComponentFixture<StatisticsJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsJobComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticsJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
