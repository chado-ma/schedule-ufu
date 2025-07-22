import { Component, Input } from '@angular/core';
import { ScheduleTimeService } from '../../services/schedule/schedule-time.service';
import { User } from '../../models/User';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-users',
  imports: [CommonModule],
  templateUrl: './table-users.component.html',
  styleUrl: './table-users.component.css'
})
export class TableUsersComponent {
  @Input() tableName: string = 'Tabela';
  @Input() tableData: User[] = [];

  constructor(private scheduleService: ScheduleTimeService) { }
  onDisponivelClick(row: User): void {
      this.scheduleService.abrirModalScheduleForm();
  }
}
