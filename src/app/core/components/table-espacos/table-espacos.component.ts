import { Component, Input } from '@angular/core';
import { Ginasio } from '../../models/Ginasio';
import { CommonModule } from '@angular/common';
import { ScheduleTimeService } from '../../services/schedule/schedule-time.service';

@Component({
  selector: 'app-table-espacos',
  imports: [CommonModule],
  templateUrl: './table-espacos.component.html',
  styleUrl: './table-espacos.component.css'
})
export class TableEspacosComponent {
    @Input() tableName: string = 'Tabela';
    @Input() tableData: Ginasio[] = [];
  
    constructor(private scheduleService: ScheduleTimeService) { }
    onDisponivelClick(row: Ginasio): void {
        this.scheduleService.abrirModalScheduleForm();
    }

}
