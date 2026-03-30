import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface RiscosTableLoadMoreButtonProps {
  onClick: () => void;
  disabled: boolean;
  loading: boolean;
}

export function RiscosTableLoadMoreButton({ onClick, disabled, loading }: RiscosTableLoadMoreButtonProps) {
  return (
    <div className="flex justify-center pt-4">
      <Button
        variant="outline"
        onClick={onClick}
        disabled={disabled}
      >
        {loading ? <Spinner /> : "Carregar mais"}
      </Button>
    </div>
  );
}
