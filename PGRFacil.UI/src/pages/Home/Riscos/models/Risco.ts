import type { Perigo } from "@/pages/Home/Perigos/models/Perigo";
import type { Dano } from "@/pages/Home/Danos/models/Dano";
import type { PlanoDeAcao } from "./PlanoDeAcao";

export interface Risco {
  id: string
  gheId: string
  gheNome: string
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
  planoDeAcao?: PlanoDeAcao
}