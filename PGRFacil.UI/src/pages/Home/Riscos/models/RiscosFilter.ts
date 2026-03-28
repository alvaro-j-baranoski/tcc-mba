export interface RiscosFilter {
  local?: string;
  atividades?: string;
  agentes?: string;
  tipoDeAvaliacao?: string;
  minSeveridade?: number;
  maxSeveridade?: number;
  severidade?: number;
  minProbabilidade?: number;
  maxProbabilidade?: number;
  probabilidade?: number;
  minSignificancia?: number;
  maxSignificancia?: number;
  significancia?: number;
  nivelSignificancia?: string;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
}
