import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontalIcon } from "lucide-react";
import "react-loading-skeleton/dist/skeleton.css";
import type { Ghe } from "../../models/Ghe";
import { GheActionsContext } from "../../context/GheActionsContext";
import { useContext } from "react";

interface Props {
  ghe: Ghe;
}

export default function GheTableDropdownMenu({ ghe }: Props) {
  const { handleModal } = useContext(GheActionsContext)!;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          aria-label="Open menu"
          size="icon-sm"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-40"
        align="end"
        onClick={(e) => e.stopPropagation()}
      >
        <DropdownMenuLabel>
          <strong>Ações</strong>
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={() => handleModal(true, "edit", ghe)}>
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => handleModal(true, "delete", ghe)}
          >
            Deletar
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
