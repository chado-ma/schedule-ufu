import { Component, AfterViewInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';;
import { CommonModule } from '@angular/common';
import { TableComponent } from "../../components/table/table.component";
import { SelectFilterComponent } from "../../components/select-filter/select-filter.component";
import { option } from '../../models/Option';
import { DatapickerComponent } from "../../components/datapicker/datapicker.component";
import { ScheduleFormComponent } from '../../components/schedule-form/schedule-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ScheduleTimeService } from '../../services/schedule/schedule-time.service';
import { SchedulesService } from '../../services/schedule/schedules.service';
import { ScheduleModel } from '../../models/ScheduleModel';
import { Ginasio } from '../../models/Ginasio';
import { LayoutSchedulesService } from '../../services/layout/layout-schedules.service';

@Component({
  selector: 'app-schedule',
  imports: [CommonModule, TableComponent, SelectFilterComponent, DatapickerComponent, ScheduleFormComponent, ReactiveFormsModule],
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent {
  Ginasios: Ginasio[] = [];
  isModalOpen: boolean = false;
  selectedDate: string = ''; // Data selecionada no datapicker
  selectedGym: string | null = null; // Ginásio selecionado

  @ViewChild('modalForm', { static: false }) modalForm!: ElementRef;
  @ViewChild('modalOverlay', { static: false }) modalOverlay!: ElementRef;

  constructor(private renderer: Renderer2, private scheduleTimeService: ScheduleTimeService, private ScheduleService: SchedulesService, private LayoutService: LayoutSchedulesService) { 
    this.selectedDate = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
    this.scheduleTimeService.horarioDisponivelClicadoEmitter.subscribe(() => {
      this.abrirModalScheduleForm();
    });
  }

  // Variáveis para o filtro e lista a ser mostrada
  selectedLabel: string = "Selecione o Ginásio para filtrar";
  agendamentos: ScheduleModel[] = []; // Lista de reservas vindas da API
  dropdownOptions: Array<option> = []; // Opções do dropdown

  

  ngOnInit(): void {
    this.Ginasios = this.LayoutService.getGinasios();
    this.Ginasios.map(ginasio => {
      this.dropdownOptions.push({
        id: ginasio.nome,
        value: ginasio.nome,
        label: ginasio.nome
      });
    });
    this.loadSchedules(); // Carregar agendamentos ao inicializar
  }

  // Método para capturar a data selecionada no datapicker
  onDateSelected(date: string): void {
    this.selectedDate = date;
    console.log('Data selecionada:', date);
    this.loadSchedules(); // Recarregar agendamentos quando a data mudar
  }

  // Carregar agendamentos baseado na data e ginásio selecionados
  loadSchedules(): void {
    if (this.selectedDate) {
      this.ScheduleService.getSchedules(this.selectedDate, this.selectedGym).subscribe({
        next: (schedules) => {
          console.log('Agendamentos carregados:', schedules);
          this.agendamentos = schedules;
        },
        error: (error) => {
          console.error('Erro ao carregar agendamentos:', error);
        }
      });
    }
  }

  //Exibição da lista
  onOptionSelected(option: option) {
    this.selectedGym = option.value;
    this.selectedLabel = option.label;
    this.loadSchedules(); 
  }

    onDisponivelClick() {
      this.abrirModalScheduleForm();
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
