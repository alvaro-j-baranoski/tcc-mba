import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { FaPlus } from "react-icons/fa";
import { GheActionsContext } from "../context/GheActionsContext";
import { useContext } from "react";

interface GheSectionHeaderProps {
  disabled: boolean;
}

export function GheSectionHeader({ disabled }: GheSectionHeaderProps) {
  const { isUserEditor } = useAuth();
  const { onAdd } = useContext(GheActionsContext)!;

  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-semibold">GHEs</h1>
      {isUserEditor && (
        <Button disabled={disabled} onClick={onAdd}>
          <FaPlus />
          <span className="ml-2">Adicionar GHE</span>
        </Button>
      )}
    </div>
  );
}
