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
import type { Risco } from "../../models/Risco";
import { RiscosActionsContext } from "../../context/RiscosActionsContext";
import { useContext } from "react";

interface Props {
    risco: Risco;
}

export default function RiscosTableDropdownMenu({ risco }: Props) {

  const { onEdit, onDelete, onPlanoDeAcao } = useContext(RiscosActionsContext)!;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" aria-label="Open menu" size="icon-sm">
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuLabel>
          <strong>Ações</strong>
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={() => onEdit(risco)}>
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => onDelete(risco)}>
            Deletar
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <strong>Plano de Ação</strong>
          </DropdownMenuLabel>
          <DropdownMenuItem onSelect={() => onPlanoDeAcao(risco)}>
            {risco.planoDeAcao ? "Gerenciar Plano" : "Adicionar Plano"}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
