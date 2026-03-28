import { createContext } from "react";
import type { Risco } from "../models/Risco";

export interface RiscosActionsContextType {
  onAdd: () => void;
  onEdit: (risco: Risco) => void;
  onDelete: (risco: Risco) => void;
  onPlanoDeAcao: (risco: Risco) => void;
}

export const RiscosActionsContext = createContext<RiscosActionsContextType | null>(null);