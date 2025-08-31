# Schedule UFU - Documentação do Projeto

## Visão Geral

O **Schedule UFU** é um sistema web para gerenciamento de reservas de espaços esportivos da Universidade Federal de Uberlândia. O projeto foi desenvolvido em Angular, utilizando Tailwind CSS e o Design System do GOVBR, com foco em usabilidade, organização e escalabilidade.

---

## Funcionalidades Implementadas

### Autenticação e Autorização

#### Tela de Login (email-code-send)
- Envio de código de verificação por email
- Validação de email institucional (@ufu.br)
- Redirecionamento para registro ou sistema principal

#### Tela de Registro (email-validator)
- Validação de código enviado por email
- Cadastro de dados pessoais (nome, matrícula, telefone)
- Geração automática de token de autenticação
- Validação de formulário com mensagens de erro personalizadas

#### Sistema de Autenticação
- Gerenciamento de tokens JWT
- Proteção de rotas com AuthGuard
- Armazenamento seguro de dados do usuário
- Logout automático com redirecionamento

### Tela Principal de Reservas (schedule)

#### Visualização de Agendamentos
- Tabela com agendamentos do dia selecionado
- Filtro por ginásio específico
- Exibição de informações: data, horário, ginásio, campus, responsável, curso

#### Filtros e Navegação
- Seletor de data (datepicker) para consulta de agendamentos
- Dropdown para filtrar por ginásio específico
- Atualização automática da tabela conforme filtros aplicados

#### Criação de Reservas
- Botão "Criar Reserva" para abrir modal de agendamento
- Integração com formulário de agendamento completo

### Formulário de Agendamento (schedule-form)

#### Dados Básicos da Reserva
- Seleção de ginásio via dropdown
- Seleção de data e horário (datetime-local)
- Validação automática para horários exatos (sem minutos)

#### Informações do Responsável
- Email institucional obrigatório (@ufu.br)
- Nome do responsável
- Curso/departamento
- Matrícula do aluno
- Telefone com máscara de formatação
- Quantidade de pessoas

#### Agendamento Recorrente
- Opção para ativar recorrência
- Configuração de término (data específica ou número de ocorrências)
- Validação de campos condicionais

#### Validações do Formulário
- Validação em tempo real com mensagens de erro
- Campos obrigatórios marcados visualmente
- Validação de formato de email, telefone e matrícula
- Prevenção de envio com dados inválidos

### Tela Minhas Reservas (userschedules)

#### Visualização de Reservas Pessoais
- Listagem de todas as reservas do usuário logado
- Informações detalhadas de cada agendamento
- Filtro por ginásio para facilitar localização

#### Gerenciamento de Reservas
- Botão "Excluir Reserva" para cancelamento
- Modal de confirmação para exclusão
- Atualização automática da lista após ações

### Formulário de Exclusão de Reserva (delete-schedule-form)

#### Seleção da Reserva para Exclusão
- Dropdown com ginásios disponíveis
- Seleção de data e horário específicos
- Validação de dados antes da exclusão

#### Confirmação de Exclusão
- Validação de formulário completo
- Envio de dados para API de exclusão
- Feedback visual de sucesso ou erro

### Tela de Configurações (configuration)

#### Interface por Abas
- Aba "Geral": Visualização de agendamentos gerais
- Aba "Espaços Esportivos": Gestão de ginásios
- Aba "Permissões": Gerenciamento de usuários

#### Gestão de Agendamentos
- Visualização de todos os agendamentos do sistema
- Filtros por tipo e localização
- Opção de cancelamento de agendamentos (funcionalidade administrativa)

#### Gestão de Espaços Esportivos
- Listagem de todos os ginásios cadastrados
- Informações: nome, campus, horários de funcionamento
- Botões para criar e excluir ginásios

#### Gestão de Usuários e Permissões
- Listagem de usuários do sistema
- Filtro por tipo de usuário (Administrador, Estudante, Professor)
- Visualização de dados: nome, matrícula, email, nível de acesso

#### Gestão de Restrições
- Cadastro de restrições temporárias em ginásios
- Visualização de restrições ativas
- Informações: ginásio, data, descrição da restrição

### Componentes Reutilizáveis

#### Sistema de Dropdowns
- Dropdown customizado (dropdownn) para formulários
- Select-filter para filtros rápidos
- Suporte a opções dinâmicas e eventos personalizados

#### Tabelas Especializadas
- Tabela principal para agendamentos
- Tabela de usuários com ações administrativas
- Tabela de espaços esportivos
- Tabela de restrições

#### Seletores de Data e Hora
- Datepicker integrado com Flatpickr
- Datetime-local para formulários
- Validação automática de formatos

#### Interface do Usuário
- Header com identificação do usuário
- Menu lateral de navegação
- Footer institucional
- Modais responsivos para formulários

### Integrações com Backend

#### Serviços de Agendamento
- Criação de novos agendamentos
- Busca por data e ginásio específicos
- Busca de agendamentos por usuário
- Exclusão de reservas existentes

#### Serviços Administrativos
- Busca de todos os agendamentos (visão administrativa)
- Gestão de usuários do sistema
- Operações com ginásios (CRUD)
- Gestão de restrições temporárias

#### Serviços de Layout
- Carregamento de dados de ginásios
- Gerenciamento de sessão do usuário
- Cache de informações essenciais

### Validações e Tratamento de Erros

#### Validações de Formulário
- Email institucional obrigatório
- Formato de telefone brasileiro
- Campos obrigatórios com feedback visual
- Validação de horários e datas

#### Tratamento de Erros
- Mensagens de erro personalizadas
- Feedback visual para operações
- Tratamento de erros de rede
- Logs detalhados para debugging

#### Experiência do Usuário
- Estados de loading durante operações
- Confirmações para ações destrutivas
- Navegação intuitiva entre telas
- Responsividade para diferentes dispositivos

---

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

---

## Estrutura de Pastas

### src/app/core/components

Componentes reutilizáveis e especializados:

- **dropdownn/**: Dropdown customizado para seleção em formulários.
- **select-filter/**: Dropdown para filtros rápidos em tabelas/listas.
- **schedule-form/**: Formulário principal de agendamento, com suporte a recorrência.
- **table/**: Tabela para exibição de reservas, com botões de ação (reservar, editar).
- **table-users/**: Tabela para gestão de usuários (nome, matrícula, email, tipo, ações).
- **table-espacos/**: Tabela para gestão de espaços esportivos (nome, campus, horários, disponibilidade, ações).
- **datapicker/**: Componente para seleção de datas e horários.
- **slider/**: Componente de slider para seleção de valores numéricos (ex: antecedência de agendamento).

### src/app/core/models

Interfaces e tipos utilizados em toda a aplicação:

- **Option.ts**: Interface para opções de dropdowns.
- **Reserva.ts**: Interface para reservas/agendamentos.
- **User.ts**: Interface para usuários do sistema.
- **Ginasio.ts**: Interface para espaços esportivos.

### src/app/core/pages

Páginas principais do sistema:

- **schedule/**: Página principal de reservas, exibe tabela de horários e permite abrir o formulário de agendamento.
- **userschdeules/**: Página "Minhas Reservas", exibe reservas do usuário e permite edição/cancelamento.
- **configuration/**: Página de configurações administrativas (gestão de reservas, espaços, permissões).

### src/app/core/routes

- **app.routes.ts**: Definição das rotas principais do sistema.

### src/app/core/services

- **schedule-time.service.ts**: Serviço para comunicação entre componentes (ex: abrir modal de agendamento).

### src/app/core/shared

Componentes compartilhados entre páginas:

- **header/**: Cabeçalho do sistema, exibe logo, nome do sistema e usuário logado.
- **footer/**: Rodapé do sistema, exibe informações institucionais.
- **menu/**: Menu lateral de navegação entre páginas principais.

---

## Outras Pastas

### src/assets

- Imagens, ícones e arquivos estáticos.

### src/styles.css

- Estilos globais e importação do Tailwind CSS.

---

## Observações e Boas Práticas

- Cada componente Angular está organizado em sua própria pasta, contendo arquivos `.ts`, `.html`, `.css` e `.spec.ts` (testes).
- Os componentes são reutilizáveis e seguem o padrão de comunicação via `@Input` e `@Output` para integração entre eles.
- Serviços são utilizados para lógica compartilhada e comunicação entre componentes que não possuem relação direta de hierarquia.
- O projeto utiliza Tailwind CSS para estilização rápida e responsiva, além do Design System do GOVBR para padronização visual.
- O código segue boas práticas de modularização, separação de responsabilidades e uso de tipagem forte com TypeScript.

---

## Como Rodar o Projeto

1. Instale as dependências:

```bash
npm install
```

2. Inicie o servidor de desenvolvimento:

```bash
ng serve
```

3. Acesse em [http://localhost:4200](http://localhost:4200)

---

## Licença

Projeto acadêmico - Universidade Federal de Uberlândia.
