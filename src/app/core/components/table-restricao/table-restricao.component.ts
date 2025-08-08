import { Component, Input } from '@angular/core';
import { ScheduleTimeService } from '../../services/schedule/schedule-time.service'
import { Restricao } from '../../models/Restricao';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-table-restricao',
  imports: [CommonModule],
  templateUrl: './table-restricao.component.html',
  styleUrl: './table-restricao.component.css',
})
export class TableRestricaoComponent {
  @Input() tableName: string = 'Tabela';
  @Input() tableData: Restricao[] = [];

  constructor(private scheduleService: ScheduleTimeService) { }
  onDisponivelClick(row: Restricao): void {
      this.scheduleService.abrirModalScheduleForm();
  }

}
