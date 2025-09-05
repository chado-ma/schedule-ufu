import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdmService } from '../../services/adm/adm.service';
import { UserData } from '../../models/UserData';

@Component({
  selector: 'app-adm-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './adm-form.component.html',
  styleUrl: './adm-form.component.css'
})
export class AdmFormComponent {
        scheduleForm!: FormGroup;
    @Output() send = new EventEmitter<boolean>();

    constructor(private fb: FormBuilder, private admService: AdmService) { }

        ngOnInit(): void {
        this.scheduleForm = this.fb.group({
                email: ['', [Validators.required, 
                    Validators.email,
                    Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]*\.?ufu\.br$/)
                ]
            ],
            nome: ['', Validators.required],
            matricula: ['', 
                [Validators.required, Validators.pattern(/^\d{5}[A-Za-z]{3}\d{3}$/)]],
            telefone: [
                '',
                [Validators.required, Validators.pattern(/^\(\d{2}\) \d{5}-\d{4}$/)],
            ]

        });
     }

    onSubmit(): void {
        this.admService.generateAdm(
            this.buildUserAdm()
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

      buildUserAdm(): UserData {
        const formValue = this.scheduleForm.value;
        const userData : UserData = {
            email: formValue.email,
            nome: formValue.nome,
            matricula: formValue.matricula,
            telefone: formValue.telefone,
            codigo: '' 
        };
        return userData;
      }

      getErrorMessage(controlName: string): string {
        const control = this.scheduleForm.get(controlName);
        if (control?.hasError('required')) {
            return 'Campo obrigatório.';
        }
        if (control?.hasError('pattern')) {
            if (controlName === 'matricula') {
                return 'Use sua matrícula no formato: 00000XXX000';
            }
            if (controlName === 'telefone') {
                return 'Use o formato: (XX) XXXXX-XXXX.';
            }
        }
        return '';
    }

}
