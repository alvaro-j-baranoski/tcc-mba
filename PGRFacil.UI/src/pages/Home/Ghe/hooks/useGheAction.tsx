import { createContext } from "react";
import type { Ghe } from "../models/Ghe";

export interface GheActionsContextType {
  onAdd: () => void;
  onEdit: (ghe: Ghe) => void;
  onDelete: (ghe: Ghe) => void;
}

export const GheActionsContext = createContext<GheActionsContextType | null>(null);