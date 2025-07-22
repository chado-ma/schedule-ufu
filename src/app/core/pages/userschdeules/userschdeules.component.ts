import { Component, ElementRef, OnInit, ViewChild, Renderer2, Inject } from '@angular/core';
import { Reserva } from '../../models/Reserva';
import { TableComponent } from '../../components/table/table.component';
import { DatapickerComponent } from '../../components/datapicker/datapicker.component';
import { SelectFilterComponent } from '../../components/select-filter/select-filter.component';
import { CommonModule } from '@angular/common';
import { option } from '../../models/Option';
import { ScheduleTimeService } from '../../services/schedule-time.service';
import { ScheduleFormComponent } from "../../components/schedule-form/schedule-form.component";
import { ScheduleModel } from '../../models/ScheduleModel';
import { SchedulesService } from '../../services/schedule/schedules.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-userschdeules',
  templateUrl: './userschdeules.component.html',
  styleUrl: './userschdeules.component.css',
  imports: [CommonModule, TableComponent, DatapickerComponent, SelectFilterComponent, ScheduleFormComponent]
})
export class UserschdeulesComponent implements OnInit {
  
    isModalOpen: boolean = false;

    @ViewChild('modalForm', { static: false }) modalForm!: ElementRef;
    @ViewChild('modalOverlay', { static: false }) modalOverlay!: ElementRef;

      constructor(private renderer: Renderer2, @Inject(ScheduleTimeService) private scheduleTimeService: ScheduleTimeService, @Inject(SchedulesService) private ScheduleService: SchedulesService, @Inject(AuthService) private authService: AuthService) {
        this.scheduleTimeService.horarioDisponivelClicadoEmitter.subscribe(() => {
          this.abrirModalScheduleForm();
        });
      }



  filteredReserva: ScheduleModel[] = [];
  selectedCampus: string = '';
  selectedLabel: string = "Selecione o Campus para filtrar";
  agendamentos: ScheduleModel[] = []; // Lista de reservas vindas da API

  dropdownOptions: Array<option> = [
    { id: 'todos', value: '', label: 'Todos' },
    { id: 'santa-monica', value: 'Santa Mônica', label: 'Santa Mônica' },
    { id: 'faefi', value: 'FAEFI', label: 'FAEFI' }
  ];

  ngOnInit(): void { 
        this.ScheduleService.getAvailableGyms().subscribe({
      next: (gyms) => {
        console.log('Ginásios disponíveis:', gyms);
        this.dropdownOptions = gyms.map(gym => ({
          id: gym.nome,
          value: gym.nome,
          label: gym.nome
        }));
      },
      error: (error) => {
        console.error('Erro ao carregar ginásios disponíveis:', error);
      }
    });

   }

  onOptionSelected(option: { value: string; label: string }): void {
    this.selectedCampus = option.value;
    this.selectedLabel = option.label;
    this.filterTable();
  }

  filterTable(): void {
    if (this.selectedCampus) {
      this.filteredReserva = this.agendamentos.filter(row => row.campus === this.selectedCampus);
    } else {
      this.filteredReserva = this.agendamentos;
    }
  }

    loadSchedules(): void {
      const user  = this.authService.getUser();
      if (!user) {
        console.error('Usuário não encontrado');
        return;
      }
      this.ScheduleService.getUserSchedules(user.matricula).subscribe({
        next: (schedules) => {
          console.log('Agendamentos carregados:', schedules);
          this.agendamentos = schedules;
        },
        error: (error) => {
          console.error('Erro ao carregar agendamentos:', error);
        }
      });
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