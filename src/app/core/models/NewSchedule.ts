

export interface NewSchedule {
  horario: string; // Time em Java -> string no formato "HH:mm:ss"
  data: string; // LocalDate em Java -> string no formato "YYYY-MM-DD"
  ginasio: string;
  responsavel: string;
  curso: string;
  campus: string; //CampusEnum
  matriculaAluno: string;
  telefone: string;
  email: string;
  quantidadePessoas: number;
}
