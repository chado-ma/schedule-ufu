export interface RestricaoRequest {
  ginasio: string;
  data: string; // LocalDate em Java -> string no formato "YYYY-MM-DD"
  descricao?: string; // Opcional, já que não tem @NotNull no backend
}
