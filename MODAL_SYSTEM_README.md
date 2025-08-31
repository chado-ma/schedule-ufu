# Sistema de Modal Genérico para Formulários

## Visão Geral

Este sistema fornece uma solução elegante e reutilizável para gerenciar diferentes tipos de formulários em modais. Usando um componente `GenericModalComponent` e um enum `FormType`, você pode facilmente adicionar novos formulários sem duplicar código.

## Estrutura

### 1. FormType Enum (`src/app/core/models/FormType.ts`)
```typescript
export enum FormType {
  CREATE_SCHEDULE = 'CREATE_SCHEDULE',
  DELETE_SCHEDULE = 'DELETE_SCHEDULE',
  CREATE_GINASIO = 'CREATE_GINASIO',
  DELETE_GINASIO = 'DELETE_GINASIO',
  CREATE_RESTRICAO = 'CREATE_RESTRICAO',
  DELETE_RESTRICAO = 'DELETE_RESTRICAO'
}
```

### 2. GenericModalComponent (`src/app/core/components/generic-modal/`)
Componente reutilizável que renderiza diferentes formulários baseado no `FormType`.

### 3. Como Usar no ConfigurationComponent

```typescript
// No componente
modalConfig: ModalConfig = {
  type: FormType.CREATE_SCHEDULE,
  title: '',
  isOpen: false
};

// Métodos para abrir modais
onCriarReservaClick(): void {
  this.openModal(FormType.CREATE_SCHEDULE, 'Criar Reserva');
}

onCancelarAgendamentoClick(): void {
  this.openModal(FormType.DELETE_SCHEDULE, 'Cancelar Agendamento');
}
```

```html
<!-- No template -->
<button class="br-button primary" (click)="onCriarReservaClick()">
  Criar Reserva
</button>

<app-generic-modal 
  [isOpen]="modalConfig.isOpen"
  [formType]="modalConfig.type"
  [title]="modalConfig.title"
  (close)="closeModal()"
  (formSubmitted)="onFormSubmit($event)">
</app-generic-modal>
```

## Como Adicionar um Novo Formulário

### Passo 1: Adicionar novo tipo no enum
```typescript
// Em FormType.ts
export enum FormType {
  // ... tipos existentes
  CREATE_USER = 'CREATE_USER'
}
```

### Passo 2: Criar o componente do formulário
```typescript
// user-form.component.ts
@Component({
  selector: 'app-user-form',
  // ... configurações
})
export class UserFormComponent {
  @Output() send = new EventEmitter<boolean>();
  
  onSubmit(): void {
    // Lógica do formulário
    this.send.emit(true); // true para sucesso, false para erro
  }
}
```

### Passo 3: Adicionar ao GenericModalComponent
```typescript
// Importar o novo componente
import { UserFormComponent } from '../user-form/user-form.component';

// Adicionar aos imports
@Component({
  imports: [CommonModule, /* outros imports */, UserFormComponent]
})
```

```html
<!-- Adicionar no template do GenericModalComponent -->
<app-user-form 
  *ngSwitchCase="FormType.CREATE_USER"
  (send)="onFormSubmit($event)">
</app-user-form>
```

### Passo 4: Adicionar botão e método no ConfigurationComponent
```typescript
onCriarUsuarioClick(): void {
  this.openModal(FormType.CREATE_USER, 'Criar Usuário');
}
```

```html
<button class="br-button primary" (click)="onCriarUsuarioClick()">
  Criar Usuário
</button>
```

## Vantagens desta Abordagem

1. **Reutilização**: Um único modal para todos os formulários
2. **Manutenibilidade**: Fácil adicionar/remover formulários
3. **Consistência**: UI consistente para todos os modals
4. **Type Safety**: Enum fornece segurança de tipos
5. **Responsividade**: Suporte completo a dispositivos móveis
6. **Acessibilidade**: Inclui recursos de acessibilidade

## Exemplo de Formulário Padrão

```typescript
@Component({
  selector: 'app-example-form',
  template: `
    <form [formGroup]="exampleForm" (ngSubmit)="onSubmit()">
      <div class="mb-4">
        <label for="field" class="block text-sm font-medium text-gray-700">
          Campo
        </label>
        <input 
          type="text" 
          id="field" 
          formControlName="field" 
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
      </div>

      <div class="flex justify-end gap-4">
        <button type="button" class="br-button secondary" (click)="onCancel()">
          Cancelar
        </button>
        <button type="submit" class="br-button primary" [disabled]="exampleForm.invalid">
          Salvar
        </button>
      </div>
    </form>
  `
})
export class ExampleFormComponent {
  @Output() send = new EventEmitter<boolean>();
  exampleForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.exampleForm = this.fb.group({
      field: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.exampleForm.valid) {
      // Chamada para API
      this.send.emit(true);
    }
  }

  onCancel(): void {
    this.send.emit(false);
  }
}
```

## Convenções

1. Todos os formulários devem emitir um evento `send` com boolean
2. `true` indica sucesso, `false` indica cancelamento/erro
3. Usar classes CSS do design system (br-button, etc.)
4. Seguir padrão de validação e mensagens de erro
5. Incluir botões "Cancelar" e "Salvar/Criar/etc."
