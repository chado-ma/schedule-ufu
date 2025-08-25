import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserScheduleFormComponent } from './user-schedule-form.component';

describe('UserScheduleFormComponent', () => {
  let component: UserScheduleFormComponent;
  let fixture: ComponentFixture<UserScheduleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserScheduleFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserScheduleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
