import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleTimeService } from '../../services/schedule/schedule-time.service';
import { ScheduleModel } from '../../models/ScheduleModel';

@Component({
  selector: 'app-table',
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input() tableName: string = 'Tabela';
  @Input() tableData: ScheduleModel[] = [];

  constructor(private scheduleService: ScheduleTimeService) { }

}
