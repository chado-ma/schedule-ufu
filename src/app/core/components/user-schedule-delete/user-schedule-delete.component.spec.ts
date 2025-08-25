import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserScheduleDeleteComponent } from './user-schedule-delete.component';

describe('UserScheduleDeleteComponent', () => {
  let component: UserScheduleDeleteComponent;
  let fixture: ComponentFixture<UserScheduleDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserScheduleDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserScheduleDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
