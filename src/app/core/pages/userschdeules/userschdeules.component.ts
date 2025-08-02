import { Component, ElementRef, OnInit, ViewChild, Renderer2, Inject, Input } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { DatapickerComponent } from '../../components/datapicker/datapicker.component';
import { SelectFilterComponent } from '../../components/select-filter/select-filter.component';
import { CommonModule } from '@angular/common';
import { option } from '../../models/Option';
import { ScheduleTimeService } from '../../services/schedule/schedule-time.service';
import { ScheduleFormComponent } from "../../components/schedule-form/schedule-form.component";
import { ScheduleModel } from '../../models/ScheduleModel';
import { SchedulesService } from '../../services/schedule/schedules.service';
import { AuthService } from '../../services/auth/auth.service';
import { Ginasio } from '../../models/Ginasio';
import { LayoutSchedulesService } from '../../services/layout/layout-schedules.service';
import { UserData } from '../../models/UserData';

@Component({
  selector: 'app-userschdeules',
  templateUrl: './userschdeules.component.html',
  styleUrl: './userschdeules.component.css',
  imports: [CommonModule, TableComponent, DatapickerComponent, SelectFilterComponent, ScheduleFormComponent]
})
export class UserschdeulesComponent implements OnInit {
    isModalOpen: boolean = false;
    Ginasios: Ginasio[] = [];
    user: UserData | null = null;

    @ViewChild('modalForm', { static: false }) modalForm!: ElementRef;
    @ViewChild('modalOverlay', { static: false }) modalOverlay!: ElementRef;

      constructor(
        private renderer: Renderer2, 
        @Inject(ScheduleTimeService) private scheduleTimeService: ScheduleTimeService, 
        @Inject(SchedulesService) private ScheduleService: SchedulesService, 
        @Inject(AuthService) private authService: AuthService,
        @Inject(LayoutSchedulesService) private LayoutService: LayoutSchedulesService
      ) {
        this.Ginasios = this.LayoutService.getGinasios();
        this.user = this.authService.getUser();
        this.scheduleTimeService.horarioDisponivelClicadoEmitter.subscribe(() => {
          this.abrirModalScheduleForm();
        });
      }



  filteredReserva: ScheduleModel[] = [];
  selectedGinasio: string = '';
  selectedLabel: string = "Selecione o Ginasio para filtrar";
  agendamentos: ScheduleModel[] = []; // Lista de reservas vindas da API
  dropdownOptions: Array<option> = [
  ];

  ngOnInit(): void { 
    this.Ginasios.map(ginasio => {
      this.dropdownOptions.push({
        id: ginasio.nome,
        value: ginasio.nome,
        label: ginasio.nome
      });
    });
    this.loadSchedules(); // Carregar agendamentos ao inicializar
    this.filterTable(); // Filtrar tabela inicialmente
   }

  onOptionSelected(option: { value: string; label: string }): void {
    this.selectedGinasio = option.value;
    this.selectedLabel = option.label;
    this.filterTable();
  }

  filterTable(): void {
    if (this.selectedGinasio) {
      this.filteredReserva = this.agendamentos.filter(row => row.campus === this.selectedGinasio);
    } else {
      this.filteredReserva = this.agendamentos;
    }
  }

    loadSchedules(): void {
      if (this.user && this.user.matricula) {
        this.ScheduleService.getUserSchedules(this.user.matricula).subscribe({
          next: (schedules) => {
            console.log('Agendamentos carregados:', schedules);
            this.agendamentos = schedules;
            this.filterTable();
          },
          error: (error) => {
            console.error('Erro ao carregar agendamentos:', error);
          }
        });
      } else {
        alert("Login não realizado ou usuário não definido.");
        console.error('Usuário ou matrícula não definida.');
      }
    }

  
  abrirModalScheduleForm(): void {
    this.isModalOpen = true;

    if (this.modalForm?.nativeElement) {
      this.renderer.setStyle(this.modalForm.nativeElement, 'display', 'block');
    }

    if (this.modalOverlay?.nativeElement) {
      this.renderer.setStyle(this.modalOverlay.nativeElement, 'display', 'block');
    }
  }

  fecharModalScheduleForm(): void {
    this.isModalOpen = false;
    this.renderer.setStyle(this.modalForm.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.modalOverlay.nativeElement, 'display', 'none');
  }
}