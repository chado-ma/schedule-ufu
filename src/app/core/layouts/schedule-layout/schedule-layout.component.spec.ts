import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleLayoutComponent } from './schedule-layout.component';

describe('ScheduleLayoutComponent', () => {
  let component: ScheduleLayoutComponent;
  let fixture: ComponentFixture<ScheduleLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
