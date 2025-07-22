import { CommonModule } from '@angular/common';
import { Component, viewChild, viewChildren } from '@angular/core';
import { Reserva } from '../../models/Reserva';
import { TableComponent } from '../../components/table/table.component';
import { DatapickerComponent } from '../../components/datapicker/datapicker.component';
import { SelectFilterComponent } from '../../components/select-filter/select-filter.component';
import { option } from '../../models/Option';
import { Action } from 'rxjs/internal/scheduler/Action';
import { SliderComponent } from "../../components/slider/slider.component";
import { TableUsersComponent } from "../../components/table-users/table-users.component";
import { user } from '../../models/User';
import { TableEspacosComponent } from "../../components/table-espacos/table-espacos.component";
import { ginasio } from '../../models/Ginasio';
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

  espacos: ginasio[] = [
    {
      name: 'G1',
      campus: 'Santa Mônica',
      horario_abertura: '08:00',
      horario_fechamento: '22:00',
      disponibilidade: 'Disponível'
    },
    {
      name: 'G2',
      campus: 'FAEFI',
      horario_abertura: '07:00',
      horario_fechamento: '21:00',
      disponibilidade: 'Indisponível'
    },
    {
      name: 'Quadra Poliesportiva',
      campus: 'Santa Mônica',
      horario_abertura: '09:00',
      horario_fechamento: '20:00',
      disponibilidade: 'Disponível'
    }
  ];
  
  users: user[] = [
    {
      name: 'Gabriel Machado',
      matricula: '20210001',
      email: 'gabriel.machado@ufu.br',
      type: 'Administrador'
    },
    {
      name: 'Ana Silva',
      matricula: '20210002',
      email: 'ana.silva@ufu.br',
      type: 'Usuário'
    },
    {
      name: 'Carlos Oliveira',
      matricula: '20210003',
      email: 'carlos.oliveira@ufu.br',
      type: 'Usuário'
    },
    {
      name: 'Mariana Santos',
      matricula: '20210004',
      email: 'mariana.santos@ufu.br',
      type: 'Administrador'
    },
    {
      name: 'João Pereira',
      matricula: '20210005',
      email: 'joao.pereira@ufu.br',
      type: 'Usuário'
    },
    {
      name: 'Fernanda Costa',
      matricula: '20210006',
      email: 'fernanda.costa@ufu.br',
      type: 'Usuário'
    },
    {
      name: 'Lucas Almeida',
      matricula: '20210007',
      email: 'lucas.almeida@ufu.br',
      type: 'Administrador'
    },
    {
      name: 'Beatriz Lima',
      matricula: '20210008',
      email: 'beatriz.lima@ufu.br',
      type: 'Usuário'
    },
    {
      name: 'Rafael Souza',
      matricula: '20210009',
      email: 'rafael.souza@ufu.br',
      type: 'Usuário'
    },
    {
      name: 'Juliana Rocha',
      matricula: '20210010',
      email: 'juliana.rocha@ufu.br',
      type: 'Administrador'
    }
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
