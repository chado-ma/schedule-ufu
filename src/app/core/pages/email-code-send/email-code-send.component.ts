import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-code-send',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './email-code-send.component.html',
  styleUrl: './email-code-send.component.css'
})
export class EmailCodeSendComponent implements OnInit {
    scheduleForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.scheduleForm = this.fb.group({
            email: [
                '',
                [
                    Validators.required, 
                    Validators.email,
                    Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]*\.?ufu\.br$/)
                ]
            ]
        });

        Object.keys(this.scheduleForm.controls).forEach(controlName => {
            const control = this.scheduleForm.get(controlName);
            control?.markAsPristine();
            control?.markAsUntouched();
        });
    }

    onSubmit(): void {
        if (this.scheduleForm.valid) {
            console.log('Formulário enviado com sucesso!', this.scheduleForm.value);
            
            // TODO: Aqui você faria a chamada para a API para enviar o código
            // Por enquanto, vamos simular um envio bem-sucedido
            
            // Redirecionar para a página de validação do código
            this.router.navigate(['/auth/register']);
            
        } else {
            console.log('Formulário inválido');
            this.markFormGroupTouched();
        }
    }

    private markFormGroupTouched(): void {
        Object.keys(this.scheduleForm.controls).forEach(controlName => {
            const control = this.scheduleForm.get(controlName);
            control?.markAsTouched();
        });
    }

    getErrorMessage(controlName: string): string {
        const control = this.scheduleForm.get(controlName);
        if (control?.hasError('required')) {
            return 'Campo obrigatório.';
        }
        if (control?.hasError('email')) {
            return 'Email inválido.';
        }
        if (control?.hasError('pattern')) {
            if (controlName === 'email') {
                return 'Use um email válido da UFU: nome@ufu.br';
            }
        }
        return '';
    }
}
