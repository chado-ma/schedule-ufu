import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-email-validator',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './email-validator.component.html',
  styleUrl: './email-validator.component.css'
})
export class EmailValidatorComponent  implements OnInit {
    scheduleForm!: FormGroup;
    

      constructor(
        private fb: FormBuilder,
        private router: Router,
        private service : AuthService
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
            ],
            nome: ['', Validators.required],
            matricula: ['', Validators.required],
            telefone: [
                '',
                [Validators.required, Validators.pattern(/^\(\d{2}\) \d{5}-\d{4}$/)],
            ],
            codigo: ['', Validators.required],

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

            this.service.verifyEmailCode(this.scheduleForm.value.email, this.scheduleForm.value.codigo).subscribe({
                next: (response) => {
                    console.log('Código validado com sucesso!', response);
                    this.generateAuth();
                },
                error: (error) => {
                    alert('Erro ao validar o código. Por favor, tente novamente.');
                    console.error('Erro ao validar o código:', error);
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

    private generateAuth(): void {
        const userData = {
            email: this.scheduleForm.value.email,
            nome: this.scheduleForm.value.nome,
            matricula: this.scheduleForm.value.matricula,
            telefone: this.scheduleForm.value.telefone,
            codigo: this.scheduleForm.value.codigo
        };
        
        this.service.gerenateAuth(userData).subscribe({
            next: (response) => {
                console.log('Token gerado com sucesso!', response);
                this.service.saveToken(response);
                this.service.saveUser(userData);
                this.router.navigate(['/reservas']);
            },
            error: (error) => {
                alert('Erro ao gerar token. Por favor, tente novamente.');
                console.error('Erro ao gerar o token:', error);
            }
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
            if (controlName === 'telefone') {
                return 'Use o formato: (XX) XXXXX-XXXX.';
            }
        }
        return '';
    }
}