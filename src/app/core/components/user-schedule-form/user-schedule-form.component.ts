import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Ginasio } from '../../models/Ginasio';
import { NewSchedule } from '../../models/NewSchedule';
import { option } from '../../models/Option';
import { LayoutSchedulesService } from '../../services/layout/layout-schedules.service';
import { SchedulesService } from '../../services/schedule/schedules.service';
import { DropdownnComponent } from '../dropdownn/dropdownn.component';
import { UserData } from '../../models/UserData';

@Component({
  selector: 'app-user-schedule-form',
  imports: [CommonModule, ReactiveFormsModule, DropdownnComponent],
  templateUrl: './user-schedule-form.component.html',
  styleUrl: './user-schedule-form.component.css'
})
export class UserScheduleFormComponent implements OnInit {
    scheduleForm!: FormGroup;
    horarioRecorrente: boolean = false;
    Ginasios: Ginasio[] = [];
    GinasioOptions: Array<option> = [];
    @Output() send = new EventEmitter<boolean>();

    constructor(private fb: FormBuilder, private schedulesService: SchedulesService, private layoutService : LayoutSchedulesService) { }

    ngOnInit(): void {
        this.Ginasios = this.layoutService.getGinasios();
        this.GinasioOptions = this.Ginasios.map(ginasio => ({
            id: ginasio.nome,
            value: ginasio.nome,
            label: `${ginasio.nome} (${ginasio.campus})`
        }));
        this.scheduleForm = this.fb.group({
            ginasio: ['', Validators.required],
            horario: ['', [Validators.required]],
            terminaEm: [''],
            dataTermino: [''],
            ocorrencias: [''],
            curso: ['', Validators.required],
            quantidade: ['', [Validators.required, Validators.min(1)]],
        });
        

        Object.keys(this.scheduleForm.controls).forEach(controlName => {
            const control = this.scheduleForm.get(controlName);
            control?.markAsPristine();
            control?.markAsUntouched();
        });

        this.scheduleForm.get('horario')?.valueChanges.subscribe(value => {
          if (value) {
            const date = new Date(value);
            // Zera os minutos e segundos da data
            date.setMinutes(0);
            date.setSeconds(0);
            
            // Atualiza o valor do form control, forçando a hora cheia
            // O { emitEvent: false } é crucial para evitar loops infinitos
            this.scheduleForm.get('horario')?.setValue(this.toIsoString(date), { emitEvent: false });
          }
        });

    }
  
    onSubmit(): void {
        this.schedulesService.createSchedule(
            this.createNewScheduleFromForm()
        ).subscribe({
            next: () => {
                this.send.emit(true);
                console.log('Formulário enviado com sucesso!', this.scheduleForm.value);
            },
            error: (err) => {
                this.send.emit(false);
                let errorMessage = 'Erro inesperado ao enviar formulário.';
                if (err.error && typeof err.error === 'string') {
                    errorMessage = err.error;
                } else if (err.error && err.error.message) {
                    errorMessage = err.error.message;
                } else if (err.message) {
                    errorMessage = err.message;
                } else if (err.status) {
                    errorMessage = `Erro ${err.status}: ${err.statusText || 'Erro no servidor'}`;
                }
                
                alert('Erro ao enviar formulário: ' + errorMessage);
                console.error('Erro ao enviar formulário:', err);
            }
        });
    }

    getErrorMessage(controlName: string): string {
        const control = this.scheduleForm.get(controlName);
        if (control?.hasError('required')) {
            return 'Campo obrigatório.';
        }
        if (control?.hasError('pattern')) {
            if (controlName === 'horario') {
                return 'Selecione uma data e horário válidos.';
            }
        }
        if (control?.hasError('min')) {
            return 'O valor deve ser maior que 0.';
        }
        return '';
    }

    onCampusSelected(selected: option): void {
        this.scheduleForm.get('campus')?.setValue(selected.value);
    }

    onGinasioSelected(selected: option): void {
        this.scheduleForm.get('ginasio')?.setValue(selected.value);
    }

    onHorarioRecorrente() {
        this.horarioRecorrente = !this.horarioRecorrente;
    }

    private toIsoString(date: Date): string {
      const pad = (num: number): string => (num < 10 ? '0' : '') + num;
      return date.getFullYear() +
          '-' + pad(date.getMonth() + 1) +
          '-' + pad(date.getDate()) +
          'T' + pad(date.getHours()) +
          ':' + pad(date.getMinutes());
    }

    private createNewScheduleFromForm(): NewSchedule {
    const formValue = this.scheduleForm.value;
    const user : UserData | null = this.layoutService.getUser();
    
    // Parse datetime-local format (YYYY-MM-DDTHH:mm) to separate date and time
    const datetimeValue = formValue.horario; // e.g., "2025-07-27T14:30"
    
    if (!datetimeValue || !datetimeValue.includes('T')) {
        throw new Error('Formato de data/hora inválido');
    }
    
    const [dateString, timeString] = datetimeValue.split('T'); // ["2025-07-27", "14:30"]
    
    // Add seconds to time format for Java Time parsing (HH:mm:ss)
    const timeWithSeconds = timeString.includes(':') ? `${timeString}:00` : timeString;
    
    return {
        horario: timeWithSeconds, // "HH:mm:ss" format for Java Time
        data: dateString, // "YYYY-MM-DD" format for Java LocalDate
        ginasio: formValue.ginasio,
        responsavel: user?.nome ?? '',
        curso: formValue.curso,
        campus: this.Ginasios.filter(ginasio => ginasio.nome === formValue.ginasio).map(ginasio => ginasio.campus)[0],
        matriculaAluno: user?.matricula ?? '',
        telefone: user?.telefone ?? '',
        email: user?.email ?? '',
        quantidadePessoas: parseInt(formValue.quantidade) || 1
    };
}
}