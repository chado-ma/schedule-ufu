import { CommonModule } from '@angular/common';
import { Component, viewChild, viewChildren } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { DatapickerComponent } from '../../components/datapicker/datapicker.component';
import { SelectFilterComponent } from '../../components/select-filter/select-filter.component';
import { option } from '../../models/Option';
import { Action } from 'rxjs/internal/scheduler/Action';
import { SliderComponent } from "../../components/slider/slider.component";
import { TableUsersComponent } from "../../components/table-users/table-users.component";
import { User } from '../../models/User';
import { TableEspacosComponent } from "../../components/table-espacos/table-espacos.component";
import { Ginasio } from '../../models/Ginasio';
import { ScheduleModel } from '../../models/ScheduleModel';

@Component({
  selector: 'app-configuration',
  imports: [CommonModule, TableComponent, DatapickerComponent, SelectFilterComponent, SliderComponent, TableUsersComponent, TableEspacosComponent],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.css'
})
export class ConfigurationComponent {
  ShowGeral: boolean = true;
  ShowEspaco: boolean = false;
  ShowPermissao: boolean = false;

  espacos: Ginasio[] = [
  ];

  users: User[] = [
  ];

  reserva: ScheduleModel[] = [
  ];

  filteredReserva: ScheduleModel[] = [];
  selectedCampus: string = '';
  selectedLabel: string = '';
  
  dropdownOptionsCampus: Array<option> = [
    { id: 'todos', value: '', label: 'Todos' },
    { id: 'santa-monica', value: 'Santa Mônica', label: 'Santa Mônica' },
    { id: 'faefi', value: 'FAEFI', label: 'FAEFI' }
  ];

  dropdownOptionsTypeUsers: Array<option> = [
    { id: 'todos', value: '', label: 'Todos' },
    { id: 'admin', value: 'Administrador', label: 'Administrador' },
    { id: 'estudante', value: 'Estudante', label: 'Estudante' },
    { id: 'professor', value: 'Professor', label: 'Professor' },
    
  ];
  
  ngOnInit(): void {
    this.filteredReserva = this.reserva;
  }
  
  onOptionSelected(option: { value: string; label: string }): void {
    this.selectedCampus = option.value;
    this.selectedLabel = option.label;
    this.filterTable();
  }
  
  filterTable(): void {
    if (this.selectedCampus) {
      this.filteredReserva = this.reserva.filter(row => row.campus === this.selectedCampus);
    } else {
      this.filteredReserva = this.reserva;
    }
  }

  onTabSelect(active: string): void {
    switch (active) {
      case 'ShowPermissao':
        this.ShowGeral = false;
        this.ShowEspaco = false;
        this.ShowPermissao = true;
        break;
      case 'ShowEspaco':
        this.ShowGeral = false;
        this.ShowEspaco = true;
        this.ShowPermissao = false;
        break;
      default:
        this.ShowGeral = true;
        this.ShowEspaco = false;
        this.ShowPermissao = false;
        break;
    }
  }
}
