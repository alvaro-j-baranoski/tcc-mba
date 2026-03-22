export interface Risco {
  id: string
  local: string
  atividades: string
  perigos: string
  danos: string
  agentes: number
  tipoDeAvaliacao: string
  severidade: number
  probabilidade: number,
  significancia: number,
  nivelDeSignificancia: number
}