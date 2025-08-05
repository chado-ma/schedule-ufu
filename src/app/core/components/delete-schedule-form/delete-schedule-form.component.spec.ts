import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteScheduleFormComponent } from './delete-schedule-form.component';

describe('DeleteScheduleFormComponent', () => {
  let component: DeleteScheduleFormComponent;
  let fixture: ComponentFixture<DeleteScheduleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteScheduleFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteScheduleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
