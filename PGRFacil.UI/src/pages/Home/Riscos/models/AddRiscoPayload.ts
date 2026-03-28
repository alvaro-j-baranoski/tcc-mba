export interface AddRiscoPayload {
  local: string,
  atividades: string,
  perigoIds: string[],
  danoIds: string[],
  agentes: number,
  tipoDeAvaliacao: string,
  severidade: number,
  probabilidade: number
}