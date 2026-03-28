import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { FaPlus } from "react-icons/fa";

interface GheTableHeaderProps {
  disabled: boolean;
  onAddButtonPressed: () => void;
}

export function GheTableHeader({
  disabled,
  onAddButtonPressed,
}: GheTableHeaderProps) {

    const { isUserEditor } = useAuth();

  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-semibold">GHEs</h1>
      {isUserEditor && (
        <Button disabled={disabled} onClick={onAddButtonPressed}>
          <FaPlus />
          <span className="ml-2">Adicionar GHE</span>
        </Button>
      )}
    </div>
  );
}
