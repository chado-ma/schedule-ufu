import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdmService } from '../../services/adm/adm.service';
import { CreateGinasio } from '../../models/CreateGinasioRequest';

@Component({
  selector: 'app-ginasio-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ginasio-form.component.html',
  styleUrl: './ginasio-form.component.css'
})
export class GinasioFormComponent {
    scheduleForm!: FormGroup;
    @Output() send = new EventEmitter<boolean>();

    constructor(private fb: FormBuilder, private admService: AdmService) { }

    
    ngOnInit(): void {
        this.scheduleForm = this.fb.group({
            nomeGinasio: ['', Validators.required],
            campus: ['', [Validators.required]],
            horarioAbertura: ['', [Validators.required]],
            horarioFechamento: ['', [Validators.required]]
        });

        this.scheduleForm.get('horarioAbertura')?.valueChanges.subscribe(value => {
          if (value) {
            const timeWithFullHour = this.roundToFullHour(value);
            if (timeWithFullHour !== value) {
              this.scheduleForm.get('horarioAbertura')?.setValue(timeWithFullHour, { emitEvent: false });
            }
          }
        });

        this.scheduleForm.get('horarioFechamento')?.valueChanges.subscribe(value => {
          if (value) {
            const timeWithFullHour = this.roundToFullHour(value);
            if (timeWithFullHour !== value) {
              this.scheduleForm.get('horarioFechamento')?.setValue(timeWithFullHour, { emitEvent: false });
            }
          }
        });
      }

        onSubmit(): void {
        this.admService.createGinasio(
            this.buildGinasioCreateRequest()
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
            if (controlName === 'horarioAbertura' || controlName === 'horarioFechamento') {
                return 'Selecione horário válidos.';
            }
        }
        if (control?.hasError('min')) {
            return 'O valor deve ser maior que 0.';
        }
        return '';
    }

    private buildGinasioCreateRequest(): CreateGinasio {
    const formValue = this.scheduleForm.value;
    const datetimeValueStart = formValue.horarioAbertura; // e.g., "14:30"
    const datetimeValueEnd = formValue.horarioFechamento; // e.g., "15:30"
    const timeWithSecondsStart = this.formatTimeWithSeconds(datetimeValueStart);
    const timeWithSecondsEnd = this.formatTimeWithSeconds(datetimeValueEnd);

    return {
        nome: formValue.nomeGinasio,
        campus: formValue.campus,
        startTime: timeWithSecondsStart,
        endTime: timeWithSecondsEnd
    };
}

    private formatTimeWithSeconds(timeValue: string): string {
        if (!timeValue) return '';
        if (timeValue.split(':').length === 3) {
            return timeValue;
        }
        if (timeValue.split(':').length === 2) {
            return `${timeValue}:00`;
        }
        return timeValue;
    }

    // ✅ Novo método para arredondar para hora cheia em campos de time
    private roundToFullHour(timeValue: string): string {
        if (!timeValue || !timeValue.includes(':')) return timeValue;
        
        const [hours, minutes] = timeValue.split(':');
        // Força sempre minutos = 00 (hora cheia)
        return `${hours}:00`;
    }

}
