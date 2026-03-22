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
  GetRiscos: (id: string) => ["GetRiscos", id] as const,
  GetGhes: "GetGhes",
  GetGheByID: (id: string) => ["GetGheByID", id] as const,
  GetMatrizDeRisco: "GetMatrizDeRisco",
  GetUsers: "GetUsers",
  GetPerigos: "GetPerigos"
} as const;

// Você pode criar um tipo se precisar
export type QueryKey = (typeof QueryKeys)[keyof typeof QueryKeys];
