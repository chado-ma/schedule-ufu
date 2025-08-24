import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

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
        private router: Router,
        private service : AuthService
    ) { }

    ngOnInit(): void {
        const savedEmail = localStorage.getItem('userEmail') || '';
        
        this.scheduleForm = this.fb.group({
            email: [
                savedEmail,
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

        if (savedEmail) {
            console.log('Email recuperado do localStorage:', savedEmail);
        }
    }

    onSubmit(): void {
    if (this.scheduleForm.valid) {
        const email = this.scheduleForm.value.email;
        console.log('Formulário enviado com sucesso!', email);
        
        this.service.sendEmailCode(email).subscribe({
            next: (response) => {
                localStorage.removeItem('userEmail');
                localStorage.setItem('userEmail', email);
                console.log('Código enviado com sucesso!', response);
                console.log('Email salvo no localStorage:', email);
                this.router.navigate(['/auth/register']);
            },
            error: (error) => {
                alert('Erro ao enviar o código. Por favor, tente novamente.');
                console.error('Erro ao enviar o código:', error);
            }
        });
        
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
