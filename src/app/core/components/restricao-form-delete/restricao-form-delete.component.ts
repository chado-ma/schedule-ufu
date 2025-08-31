import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdmService } from '../../services/adm/adm.service';
import { Ginasio } from '../../models/Ginasio';
import { option } from '../../models/Option';
import { RestricaoRequest } from '../../models/RestricaoRequest';
import { LayoutSchedulesService } from '../../services/layout/layout-schedules.service';
import { DropdownnComponent } from '../dropdownn/dropdownn.component';

@Component({
  selector: 'app-restricao-form-delete',
  imports: [CommonModule, ReactiveFormsModule, DropdownnComponent],
  templateUrl: './restricao-form-delete.component.html',
  styleUrl: './restricao-form-delete.component.css'
})
export class RestricaoFormDeleteComponent  {
      scheduleForm!: FormGroup;
      Ginasios: Ginasio[] = [];
      GinasioOptions: Array<option> = [];
    @Output() send = new EventEmitter<boolean>();

    constructor(private fb: FormBuilder, private admService: AdmService,  private layoutService : LayoutSchedulesService) { }
        ngOnInit(): void {
        this.Ginasios = this.layoutService.getGinasios();
        this.setupGinasioOptions();
        
        this.scheduleForm = this.fb.group({
            data: ['', [Validators.required]],
            ginasio: ['', Validators.required]
        });

        Object.keys(this.scheduleForm.controls).forEach(controlName => {
            const control = this.scheduleForm.get(controlName);
            control?.markAsPristine();
            control?.markAsUntouched();
        });
        
        // ✅ Observar mudanças nos ginásios
        this.layoutService.ginasios$.subscribe(ginasios => {
            this.Ginasios = ginasios;
            this.setupGinasioOptions();
            console.log('Ginásios atualizados via Observable (DeleteScheduleForm):', ginasios);
        });
    }

    private setupGinasioOptions(): void {
        this.GinasioOptions = this.Ginasios.map(ginasio => ({
            id: ginasio.nome,
            value: ginasio.nome,
            label: `${ginasio.nome} (${ginasio.campus})`
        }));
    }

    onGinasioSelected(selected: option): void {
        this.scheduleForm.get('ginasio')?.setValue(selected.value);
    }

        onSubmit(): void {
        this.admService.deleteRestricao(
            this.buildRestricaoRequest()
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
            if (controlName === 'data') {
                return 'Selecione uma data válida.';
            }
            if (controlName === 'telefone') {
                return 'Use o formato: (XX) XXXXX-XXXX.';
            }
            if (controlName === 'email') {
                return 'Use um email válido da UFU: nome@ufu.br';
            }
        }
        if (control?.hasError('min')) {
            return 'O valor deve ser maior que 0.';
        }
        return '';
    }

    buildRestricaoRequest(): RestricaoRequest {
        const formValue = this.scheduleForm.value;
        return {
            ginasio: formValue.ginasio,
            data: formValue.data,
            descricao: '' // Descrição não é necessária para exclusão
        };
    }

}