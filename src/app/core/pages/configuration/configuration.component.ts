import { CommonModule } from '@angular/common';
import { Component, ElementRef, Inject, Renderer2, ViewChild, viewChild, viewChildren } from '@angular/core';
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
import { AdmService } from '../../services/adm/adm.service';
import { LayoutSchedulesService } from '../../services/layout/layout-schedules.service';
import { Restricao } from '../../models/Restricao';
import { TableRestricaoComponent } from '../../components/table-restricao/table-restricao.component';
import { ScheduleTimeService } from '../../services/schedule/schedule-time.service';
import { ScheduleFormComponent } from "../../components/schedule-form/schedule-form.component";

@Component({
  selector: 'app-configuration',
  imports: [CommonModule, TableComponent, SelectFilterComponent, SliderComponent, TableUsersComponent, TableEspacosComponent, TableRestricaoComponent, ScheduleFormComponent],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.css'
})
export class ConfigurationComponent {
  isModelOpenSchedule: boolean = false;
  ShowGeral: boolean = true;
  ShowEspaco: boolean = false;
  ShowPermissao: boolean = false;

  @ViewChild('modalForm', { static: false }) modalForm!: ElementRef;
  @ViewChild('modalOverlay', { static: false }) modalOverlay!: ElementRef;

  constructor(@Inject(LayoutSchedulesService) private LayoutService: LayoutSchedulesService, @Inject(AdmService) private AdmService: AdmService, @Inject(ScheduleTimeService) private scheduleTimeService: ScheduleTimeService, @Inject(Renderer2) private renderer: Renderer2) {
      this.scheduleTimeService.horarioDisponivelClicadoEmitter.subscribe(() => {
      this.abrirModalScheduleForm();
    });
  }

  espacos: Ginasio[] = [
  ];

  users: User[] = [
  ];

  reserva: ScheduleModel[] = [
  ];

  restricao : Restricao[] = [
  ];

  filteredReserva: ScheduleModel[] = [];
  selectedCampus: string = '';
  selectedLabel: string = '';
  
  dropdownOptionsGinasios: Array<option> = [

  ];

    dropdownOptionsTypeUsers: Array<option> = [
    { id: 'todos', value: '', label: 'Todos' },
    { id: 'admin', value: 'Administrador', label: 'Administrador' },
    { id: 'estudante', value: 'Estudante', label: 'Estudante' },
    { id: 'professor', value: 'Professor', label: 'Professor' },
  ];
  
  ngOnInit(): void {
    this.AdmService.getAllSchedules().subscribe({
      next: (data: ScheduleModel[]) => {
        console.log('Agendamentos carregados:', data);
        this.reserva = data;  
        this.filteredReserva = this.reserva;
      },
      error: (error: any) => {
        console.error('Erro ao carregar agendamentos:', error);
      }
    });
    this.AdmService.getAllRestrictions().subscribe({
      next: (data: Restricao[]) => {
        console.log('Restrições carregadas:', data);
        this.restricao = data;
      },
      error: (error: any) => {
        console.error('Erro ao carregar restrições:', error);
      }
    });
    this.AdmService.getAllUsers().subscribe({
      next: (data: User[]) => {
        console.log('Usuários carregados:', data);
        this.users = data;
      },
      error: (error: any) => {
        console.error('Erro ao carregar usuários:', error);
      }
    });
    this.loadGinasios(); 
    this.setupDropdownOptions();
    this.filterTable();
  }

  onDisponivelClick() {
      this.abrirModalScheduleForm();
    }


    private loadGinasios(): void {
    this.espacos = this.LayoutService.getGinasios();
    console.log('Ginasios carregados:', this.espacos);
    this.setupDropdownOptions();
  }


  private setupDropdownOptions(): void {
    this.dropdownOptionsGinasios = this.espacos.map(ginasio => ({
      id: ginasio.nome,
      value: ginasio.nome,
      label: `${ginasio.nome} (${ginasio.campus})`
    }));
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

    abrirModalScheduleForm(): void {
    this.isModelOpenSchedule = true;

    if (this.modalForm?.nativeElement) {
      this.renderer.setStyle(this.modalForm.nativeElement, 'display', 'block');
    }

    if (this.modalOverlay?.nativeElement) {
      this.renderer.setStyle(this.modalOverlay.nativeElement, 'display', 'block');
    }
  }

  fecharModalScheduleForm(): void {
    this.isModelOpenSchedule = false;
    this.renderer.setStyle(this.modalForm.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.modalOverlay.nativeElement, 'display', 'none');
  }

  onFormSubmit(success: boolean): void {
    if (success) {
      this.fecharModalScheduleForm();
      this.AdmService.getAllSchedules().subscribe({
        next: (data: ScheduleModel[]) => {
          console.log('Agendamentos carregados:', data);
          this.reserva = data;  
          this.filteredReserva = this.reserva;
        },
        error: (error: any) => {
          console.error('Erro ao carregar agendamentos:', error);
        }
      });
      this.filterTable();
    }
  }
}
