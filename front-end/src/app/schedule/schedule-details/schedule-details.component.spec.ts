import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleDetailsComponent } from './schedule-details.component';

describe('ScheduleDetailsComponent', () => {
  let component: ScheduleDetailsComponent;
  let fixture: ComponentFixture<ScheduleDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleDetailsComponent]
    });
    fixture = TestBed.createComponent(ScheduleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
