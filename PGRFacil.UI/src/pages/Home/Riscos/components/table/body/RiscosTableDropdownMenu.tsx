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
import type { Risco } from "../../../models/Risco";
import { RiscosActionsContext } from "../../../context/RiscosActionsContext";
import { useContext } from "react";
import { PlanoDeAcaoActionsContext } from "../../../context/PlanoDeAcaoActionsContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RiscosService } from "../../../services/RiscosService";
import { invalidateQueriesForUpdatesOnRisco } from "@/lib/riscoUtils";

interface Props {
    risco: Risco;
}

export default function RiscosTableDropdownMenu({ risco }: Props) {
    const { handleModal } = useContext(RiscosActionsContext)!;
    const { handleModal: handlePlanoDeAcaoModal } = useContext(PlanoDeAcaoActionsContext)!;
    const queryClient = useQueryClient();

    const { mutate: deleteRisco } = useMutation({
        mutationFn: () => RiscosService.deleteRisco({ gheId: risco.gheId, riscoId: risco.id }),
        onSuccess: () => invalidateQueriesForUpdatesOnRisco(queryClient, risco.gheId),
    });

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
                    <DropdownMenuItem onSelect={() => handleModal(true, "edit", risco)}>Editar</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => deleteRisco()}>Deletar</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuGroup>
                    <DropdownMenuLabel>
                        <strong>Plano de Ação</strong>
                    </DropdownMenuLabel>
                    <DropdownMenuItem onSelect={() => handlePlanoDeAcaoModal(true, risco.planoDeAcao ?? null, risco)}>
                        {risco.planoDeAcao ? "Gerenciar Plano" : "Adicionar Plano"}
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
