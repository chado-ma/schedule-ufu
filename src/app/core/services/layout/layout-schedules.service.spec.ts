/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { LayoutSchedulesService } from './layout-schedules.service';

describe('Service: LayoutSchedules', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LayoutSchedulesService]
    });
  });

  it('should ...', inject([LayoutSchedulesService], (service: LayoutSchedulesService) => {
    expect(service).toBeTruthy();
  }));
});
