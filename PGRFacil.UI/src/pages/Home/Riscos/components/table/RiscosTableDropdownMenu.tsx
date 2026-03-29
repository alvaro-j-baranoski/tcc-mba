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
import { PlanoDeAcaoActionsContext } from "../../context/PlanoDeAcaoActionsContext";

interface Props {
  risco: Risco;
}

export default function RiscosTableDropdownMenu({ risco }: Props) {
  const { handleModal } = useContext(RiscosActionsContext)!;
  const { handleModal: handlePlanoDeAcaoModal } = useContext(
    PlanoDeAcaoActionsContext,
  )!;

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
          <DropdownMenuItem onSelect={() => handleModal(true, "edit", risco)}>
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => handleModal(true, "delete", risco)}>
            Deletar
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <strong>Plano de Ação</strong>
          </DropdownMenuLabel>
          <DropdownMenuItem
            onSelect={() =>
              handlePlanoDeAcaoModal(true, risco.planoDeAcao ?? null, risco.id)
            }
          >
            {risco.planoDeAcao ? "Gerenciar Plano" : "Adicionar Plano"}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
