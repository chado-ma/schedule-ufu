import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-ginasio-form',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="ginasioForm" (ngSubmit)="onSubmit()">
      <div class="mb-4">
        <label for="nome" class="block text-sm font-medium text-gray-700">Nome do Ginásio</label>
        <input type="text" id="nome" formControlName="nome" 
               class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
        <div *ngIf="ginasioForm.get('nome')?.invalid && ginasioForm.get('nome')?.touched" 
             class="text-red-500 text-sm mt-1">
          {{ getErrorMessage('nome') }}
        </div>
      </div>

      <div class="mb-4">
        <label for="campus" class="block text-sm font-medium text-gray-700">Campus</label>
        <input type="text" id="campus" formControlName="campus" 
               class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
        <div *ngIf="ginasioForm.get('campus')?.invalid && ginasioForm.get('campus')?.touched" 
             class="text-red-500 text-sm mt-1">
          {{ getErrorMessage('campus') }}
        </div>
      </div>

      <div class="mb-4">
        <label for="capacidade" class="block text-sm font-medium text-gray-700">Capacidade</label>
        <input type="number" id="capacidade" formControlName="capacidade" 
               class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
        <div *ngIf="ginasioForm.get('capacidade')?.invalid && ginasioForm.get('capacidade')?.touched" 
             class="text-red-500 text-sm mt-1">
          {{ getErrorMessage('capacidade') }}
        </div>
      </div>

      <div class="flex justify-end gap-4">
        <button type="button" class="br-button secondary" (click)="onCancel()">
          Cancelar
        </button>
        <button type="submit" class="br-button primary" [disabled]="ginasioForm.invalid">
          Criar Ginásio
        </button>
      </div>
    </form>
  `,
  styles: [`
    .br-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `]
})
export class GinasioFormComponent {
  ginasioForm!: FormGroup;
  @Output() send = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder) {
    this.ginasioForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      campus: ['', [Validators.required]],
      capacidade: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.ginasioForm.valid) {
      // Aqui você faria a chamada para o serviço
      console.log('Criando ginásio:', this.ginasioForm.value);
      
      // Simular sucesso
      setTimeout(() => {
        this.send.emit(true);
      }, 1000);
    }
  }

  onCancel(): void {
    this.send.emit(false);
  }

  getErrorMessage(controlName: string): string {
    const control = this.ginasioForm.get(controlName);
    if (control?.hasError('required')) {
      return 'Campo obrigatório.';
    }
    if (control?.hasError('minlength')) {
      return 'Mínimo de 3 caracteres.';
    }
    if (control?.hasError('min')) {
      return 'Capacidade deve ser maior que 0.';
    }
    return '';
  }
}
