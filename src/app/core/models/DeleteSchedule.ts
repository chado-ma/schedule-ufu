export interface DeleteSchedule {
  horario: string; // Time em Java -> string no formato "HH:mm:ss"
  data: string; // LocalDate em Java -> string no formato "YYYY-MM-DD"
  ginasio: string;
  matriculaAluno: string;
}
