import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
            // TODO: Implementar lógica de envio do código de 
            this.router.navigate(['/reservas']);
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
            if (controlName === 'telefone') {
                return 'Use o formato: (XX) XXXXX-XXXX.';
            }
        }
        return '';
    }
}