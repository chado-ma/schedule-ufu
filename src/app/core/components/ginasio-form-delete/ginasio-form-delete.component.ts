import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdmService } from '../../services/adm/adm.service';

@Component({
  selector: 'app-ginasio-form-delete',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ginasio-form-delete.component.html',
  styleUrl: './ginasio-form-delete.component.css'
})
export class GinasioFormDeleteComponent {
      scheduleForm!: FormGroup;
    @Output() send = new EventEmitter<boolean>();

    constructor(private fb: FormBuilder, private admService: AdmService) { }

        ngOnInit(): void {
        this.scheduleForm = this.fb.group({
            nomeGinasio: ['', Validators.required]
        });
        }

        onSubmit(): void {
       const formValue = this.scheduleForm.value;
        this.admService.deleteGinasio(
            formValue.nomeGinasio
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
        return '';
    }

}
