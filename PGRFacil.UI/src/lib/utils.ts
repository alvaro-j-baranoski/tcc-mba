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
  GetRiscos: (guid: string) => ["GetRiscos", guid] as const,
  GetProgramas: "GetProgramas",
  GetProgramaByID: (guid: string) => ["GetProgramaByID", guid] as const,
  GetMatrizDeRisco: "GetMatrizDeRisco",
  GetUsers: "GetUsers"
} as const;

// Você pode criar um tipo se precisar
export type QueryKey = (typeof QueryKeys)[keyof typeof QueryKeys];
