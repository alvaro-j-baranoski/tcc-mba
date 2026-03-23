import type { Perigo } from "@/pages/Home/Perigos/models/Perigo";
import type { Dano } from "@/pages/Home/Danos/models/Dano";

export interface Risco {
  id: string
  local: string
  atividades: string
  perigos: Perigo[]
  danos: Dano[]
  agentes: number
  tipoDeAvaliacao: string
  severidade: number
  probabilidade: number,
  significancia: number,
  nivelSignificancia: number
}