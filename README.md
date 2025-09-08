# Schedule UFU - Sistema de Agendamento de Espaços Esportivos

## 🎯 Sobre o Projeto

O **Schedule UFU** é a aplicação web frontend da plataforma de **agendamento de espaços esportivos da Universidade Federal de Uberlândia (UFU)**.

Construído em **Angular 19**, com **Tailwind CSS** e **Design System do GOVBR**, o sistema prioriza **usabilidade, acessibilidade e responsividade**, permitindo que estudantes, professores e administradores realizem reservas de forma simples e segura.

Este frontend se conecta diretamente à API do backend **Schedule-Core** (Spring Boot + PostgreSQL), consumindo endpoints REST autenticados via **JWT**.

---

## ✨ Funcionalidades

### 🔐 Autenticação e Autorização
- Envio de código para e-mail institucional (@ufu.br)
- Validação de código e login com token JWT
- Proteção de rotas com [`authGuard`](src/app/core/guards/auth.guard.ts)
- Armazenamento seguro de sessão e logout automático

### 📅 Reservas de Usuário
- Visualização de horários disponíveis por data/ginásio
- Criação de novas reservas com formulário completo
- Cancelamento de reservas existentes
- Filtros por ginásio e data
- Sistema de validação em tempo real

### 👤 Área do Usuário
- Tela **Minhas Reservas** com listagem personalizada
- Cancelamento de reservas próprias
- Feedback visual de sucesso/erro
- Histórico de agendamentos

### ⚙️ Administração (Área Restrita)
- Gestão de ginásios (CRUD)
- Gestão de usuários e permissões
- Cadastro de restrições temporárias em espaços
- Visualização de todos os agendamentos do sistema
- Criação de novos administradores

### 🧩 Componentes Reutilizáveis
- Sistema de modal genérico para formulários
- Dropdowns customizados e filtros
- Datepicker integrado com Flatpickr
- Tabelas dinâmicas responsivas
- Header, menu lateral e footer institucionais
- Formulários com validações integradas

---

## 🏗️ Arquitetura do Frontend

A aplicação segue a arquitetura de **Single Page Application (SPA)** com Angular:

### 🎨 Layouts
- **[`AuthLayoutComponent`](src/app/core/layouts/auth-layout/auth-layout.component.ts)**: Telas de login e validação de e-mail
- **[`ScheduleLayoutComponent`](src/app/core/layouts/schedule-layout/schedule-layout.component.ts)**: Área logada de agendamento e administração

### 📄 Páginas (Pages)
- **[`email-code-send`](src/app/core/pages/email-code-send/email-code-send.component.ts)**: Envio de código por email
- **[`email-validator`](src/app/core/pages/email-validator/email-validator.component.ts)**: Validação e cadastro
- **[`schedule`](src/app/core/pages/schedule/schedule.component.ts)**: Página principal de agendamento
- **[`userschedules`](src/app/core/pages/userschdeules/userschdeules.component.ts)**: Reservas do usuário
- **[`configuration`](src/app/core/pages/configuration/configuration.component.ts)**: Administração completa

### 🔧 Serviços (Services)
- **[`AuthService`](src/app/core/services/auth/auth.service.ts)**: Autenticação e gerenciamento de sessão
- **[`SchedulesService`](src/app/core/services/schedule/schedules.service.ts)**: CRUD de reservas
- **[`AdmService`](src/app/core/services/adm/adm.service.ts)**: Operações administrativas
- **[`ScheduleTimeService`](src/app/core/services/schedule/schedule-time.service.ts)**: Comunicação entre componentes
- **[`LayoutSchedulesService`](src/app/core/services/layout/layout-schedules.service.ts)**: Gerenciamento de layout e dados

### 🛡️ Guards & Routing
- **[`authGuard`](src/app/core/guards/auth.guard.ts)**: Proteção de rotas privadas
- **[`app.routes.ts`](src/app/core/routes/app.routes.ts)**: Configuração completa de rotas

---

## 🔗 Integração com o Backend

- O frontend consome a API do **Schedule-Core**, hospedada por padrão em `http://localhost:3000`
- Durante o desenvolvimento, é utilizado um **[proxy Angular](proxy.conf.json)** para redirecionar chamadas

### Fluxo Completo
1. **Usuário** → Frontend Angular
2. **Frontend** → API REST (Schedule-Core)
3. **Backend** → PostgreSQL (persistência)
4. **Resposta** → Frontend → Interface gráfica

### Principais Endpoints Consumidos
- `POST /v1/auth/email` - Envio de código
- `POST /v1/auth/email/validate` - Validação de código
- `GET /v1/schedule` - Buscar agendamentos
- `POST /v1/schedule` - Criar agendamento
- `DELETE /v1/schedule/delete` - Cancelar agendamento
- `GET /v1/adm/users` - Gestão de usuários
- `GET /v1/adm/ginasios` - Gestão de ginásios

---

## 📱 Principais Telas

### 🔑 Autenticação
- **Tela de Login**: Envio de código para email institucional
- **Tela de Validação**: Verificação de código e cadastro de dados

### 📅 Agendamento
- **Tela Principal**: Visualização de agendamentos por data/ginásio
- **Formulário de Reserva**: Criação completa com validações
- **Minhas Reservas**: Gestão pessoal de agendamentos

### ⚙️ Administração
- **Gestão de Usuários**: CRUD completo com permissões
- **Gestão de Ginásios**: Cadastro e configuração de espaços
- **Restrições**: Bloqueio temporário de espaços

---

## ⚙️ Como Rodar

### Pré-requisitos
- **Node.js 18+**
- **Angular CLI**: `npm install -g @angular/cli`
- **Backend Schedule-Core** em execução (porta 3000)

### Passos

```bash
# 1. Clonar o repositório
git clone [url-do-repositorio]
cd schedule-ufu

# 2. Instalar dependências
npm install

# 3. Iniciar servidor de desenvolvimento
ng serve

# 4. Acessar aplicação
# http://localhost:4200
```

### Scripts Disponíveis

```bash
# Desenvolvimento
npm start
ng serve

# Build de produção
npm run build
ng build

# Testes unitários
npm test
ng test

# Linting
npm run lint
```

## 📂 Estrutura de Pastas

```
src/app/
├── core/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── generic-modal/   # Sistema de modal genérico
│   │   ├── schedule-form/   # Formulário de agendamento
│   │   ├── table/           # Tabelas dinâmicas
│   │   ├── datepicker/      # Seletor de datas
│   │   ├── dropdownn/       # Dropdowns customizados
│   │   └── ...
│   ├── guards/              # Proteção de rotas
│   │   └── auth.guard.ts
│   ├── layouts/             # Layouts principais
│   │   ├── auth-layout/
│   │   └── schedule-layout/
│   ├── models/              # Interfaces TypeScript
│   │   ├── User.ts
│   │   ├── ScheduleModel.ts
│   │   ├── Ginasio.ts
│   │   └── ...
│   ├── pages/               # Páginas principais
│   │   ├── schedule/
│   │   ├── userschdeules/
│   │   ├── configuration/
│   │   └── ...
│   ├── routes/              # Configuração de rotas
│   │   └── app.routes.ts
│   ├── services/            # Serviços da aplicação
│   │   ├── auth/
│   │   ├── schedule/
│   │   ├── adm/
│   │   └── ...
│   └── shared/              # Componentes compartilhados
│       ├── header/
│       ├── footer/
│       └── menu/
└── assets/                  # Recursos estáticos
    ├── favicon.ico
    ├── image-logo.png
    └── ...
```

---

## 🛠️ Tecnologias Utilizadas

### Core
- **Angular 19** - Framework principal
- **TypeScript** - Linguagem de programação
- **RxJS** - Programação reativa

### UI/UX
- **Tailwind CSS** - Framework CSS utilitário
- **Design System GOVBR** - Padrões governamentais
- **Flatpickr** - Datepicker avançado
- **Font Awesome** - Ícones

### Ferramentas
- **Angular CLI** - Scaffolding e build
- **Karma & Jasmine** - Testes unitários
- **ESLint** - Linting de código
- **PostCSS** - Processamento CSS

---

## 🔧 Funcionalidades Técnicas

### Sistema de Modal Genérico
- Baseado em [`FormType enum`](src/app/core/models/FormType.ts)
- [`GenericModalComponent`](src/app/core/components/generic-modal/generic-modal.component.ts) reutilizável
- Formulários padronizados com validações

### Gerenciamento de Estado
- Serviços com BehaviorSubject para estado reativo
- LocalStorage para persistência de sessão
- Guards para proteção de rotas

### Validações Avançadas
- Email institucional obrigatório (@ufu.br)
- Máscaras para telefone e matrícula
- Validação de horários em tempo real
- Feedback visual de erros

### Responsividade
- Breakpoints configurados
- Componentes adaptativos

---

## 📚 Contexto Acadêmico

Este frontend compõe, junto ao backend **Schedule-Core**, o protótipo funcional do TCC **"Plataforma de Agendamento de Espaços Esportivos da UFU"**, desenvolvido na **Universidade Federal de Uberlândia**.

O sistema demonstra a aplicação de boas práticas de:
- Arquitetura frontend moderna
- Segurança com JWT
- Usabilidade e acessibilidade
- Integração com APIs REST
- Design responsivo

### Objetivos Alcançados
- ✅ Modernização do processo de reservas
- ✅ Interface intuitiva e acessível
- ✅ Integração completa frontend/backend
- ✅ Sistema de autenticação robusto
- ✅ Área administrativa funcional

---

## 👤 Autor

**Gabriel Rezende Machado**  
Universidade Federal de Uberlândia  
Trabalho de Conclusão de Curso

---