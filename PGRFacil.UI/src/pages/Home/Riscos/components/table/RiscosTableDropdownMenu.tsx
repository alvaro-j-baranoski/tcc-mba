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

interface Props {
    risco: Risco;
}

export default function RiscosTableDropdownMenu({ risco }: Props) {
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
          <DropdownMenuItem onSelect={() => handleOnEditButtonPressed(risco)}>
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => handleOnDeleteButtonPressed(risco)}>
            Deletar
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <strong>Plano de Ação</strong>
          </DropdownMenuLabel>
          <DropdownMenuItem onSelect={() => handleOnAddPlanoPressed(risco)}>
            {risco.planoDeAcao ? "Gerenciar Plano" : "Adicionar Plano"}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
