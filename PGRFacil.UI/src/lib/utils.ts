import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mapNivelSignificancia(significancia: number) {
  switch (significancia) {
    case 0:
      return "Baixa";
    case 1:
      return "Média";
    case 2:
      return "Alta";
    default:
      return "Desconhecida";
  }
}

export const QueryKeys = {
  GetRiscos: "GetRiscos",
  GetProgramas: "GetProgramas",
  GetProgramaByID: "GetProgramaByID",
  GetMatrizDeRisco: "GetMatrizDeRisco"
} as const;

// Você pode criar um tipo se precisar
export type QueryKey = (typeof QueryKeys)[keyof typeof QueryKeys];
