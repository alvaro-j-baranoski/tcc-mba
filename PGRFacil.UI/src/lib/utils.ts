import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function mapNivelSignificancia(significancia: number)
{
  switch (significancia) {
    case 0:
      return "Baixa"      
    case 1:
      return "Média"
    case 2:
      return "Alta"
    default:
      return "Desconhecida"
  }
}
