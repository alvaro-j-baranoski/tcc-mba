import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mapNivelSignificancia(significancia: number) {
  switch (significancia) {
    case 0:
      return "Baixo";
    case 1:
      return "Médio";
    case 2:
      return "Alto";
    default:
      return "Desconhecida";
  }
}

export const QueryKeys = {
  GetAllRiscos: "GetAllRiscos",
  GetRiscos: (id: string) => ["GetRiscos", id] as const,
  GetGhes: "GetGhes",
  GetGheByID: (id: string) => ["GetGheByID", id] as const,
  GetMatrizDeRisco: "GetMatrizDeRisco",
  GetUsers: "GetUsers",
  GetPerigos: "GetPerigos",
  GetDanos: "GetDanos",
  GetVersoes: (gheId: string) => ["GetVersoes", gheId] as const
} as const;

// Você pode criar um tipo se precisar
export type QueryKey = (typeof QueryKeys)[keyof typeof QueryKeys];
