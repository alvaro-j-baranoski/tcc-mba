import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/hooks/useAuth";
import { invalidateQueriesForUpdatesOnRisco } from "@/lib/riscoUtils";
import { mapNivelSignificancia } from "@/lib/utils";
import { AgentesDeRisco } from "@/models/AgentesDeRisco";
import type { Risco } from "@/pages/Programa/models/Risco";
import { RiscosService } from "@/pages/Programa/services/RiscosService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MoreHorizontalIcon } from "lucide-react";
import { useState } from "react";
import { AddEditRiscoDialog } from "./AddEditRiscoDialog";
import { PlanoDeAcaoDialog } from "./AddEditPlanoDeAcaoDialog";

interface Props {
  gheId?: string;
  riscosData?:  Risco[] | undefined;
}

export default function RiscosTable({gheId, riscosData}: Props) {
  const [targetRisco, setTargetRisco] = useState<Risco | null>(null);
  const [editDialogControlledOpen, setEditDialogControlledOpen] = useState(false);
  const [planoDialogOpen, setPlanoDialogOpen] = useState(false);
  const { isUserEditor } = useAuth();
  const queryClient = useQueryClient();

  const handleOnEditButtonPressed = (risco: Risco) => {
    setTargetRisco(risco);
    setEditDialogControlledOpen(true);
  };

  const handleOnDeleteButtonPressed = (risco: Risco) => {
    deleteMutate({ gheId: gheId ?? "", riscoId: risco.id });
  };

  const handleOnAddPlanoPressed = (risco: Risco) => {
    setTargetRisco(risco);
    setPlanoDialogOpen(true);
  };

  const handleOnDeleteSuccess = () => {
    invalidateQueriesForUpdatesOnRisco(queryClient, gheId!);
  };

  const { mutate: deleteMutate } = useMutation({
    mutationFn: RiscosService.deleteRisco,
    onSuccess: handleOnDeleteSuccess,
  });

  const getSignificanciaBadgeColor = (significancia: string) => {
    switch (significancia) {
      case "Baixa":
        return "bg-green-600 text-white hover:bg-green-700";
      case "Média":
        return "bg-yellow-600 text-white hover:bg-yellow-700";
      default:
        return "bg-red-600 text-white hover:bg-red-700";
    }
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <strong>Local</strong>
            </TableHead>
            <TableHead>
              <strong>Atividades</strong>
            </TableHead>
            <TableHead>
              <strong>Perigos</strong>
            </TableHead>
            <TableHead>
              <strong>Danos</strong>
            </TableHead>
            <TableHead>
              <strong>Agentes de Risco</strong>
            </TableHead>
            <TableHead>
              <strong>Tipo de Avaliação</strong>
            </TableHead>
            <TableHead>
              <strong>Severidade</strong>
            </TableHead>
            <TableHead>
              <strong>Probabilidade</strong>
            </TableHead>
            <TableHead>
              <strong>Significância</strong>
            </TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {riscosData?.map((risco) => (
            <TableRow key={risco.id}>
              <TableCell>
                <div className="max-w-[200px] truncate">
                  <small className="text-xs leading-none font-medium">
                    {risco.local}
                  </small>
                </div>
              </TableCell>
              <TableCell>
                <div className="max-w-[200px] truncate">
                  <small className="text-xs leading-none font-medium">
                    {risco.atividades}
                  </small>
                </div>
              </TableCell>
              <TableCell>
                <div className="max-w-[400px] flex flex-wrap gap-1">
                  {risco.perigos.map((perigo) => (
                    <Badge key={perigo.id} variant="secondary">
                      {perigo.descricao}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="max-w-[400px] flex flex-wrap gap-1">
                  {risco.danos.map((dano) => (
                    <Badge key={dano.id} variant="secondary">
                      {dano.descricao}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="max-w-[400px] text-wrap">
                  <small className="text-xs leading-none font-medium">
                    {AgentesDeRisco.find((a) => a.key === risco.agentes)?.value}
                  </small>
                </div>
              </TableCell>
              <TableCell>
                <div className="max-w-[400px] text-wrap">
                  <small className="text-xs leading-none font-medium">
                    {risco.tipoDeAvaliacao}
                  </small>
                </div>
              </TableCell>
              <TableCell>
                <div className="max-w-[400px] text-wrap">
                  <small className="text-xs leading-none font-medium">
                    {risco.severidade}
                  </small>
                </div>
              </TableCell>
              <TableCell>
                <div className="max-w-[400px] text-wrap">
                  <small className="text-xs leading-none font-medium">
                    {risco.probabilidade}
                  </small>
                </div>
              </TableCell>
              <TableCell>
                <div className="max-w-[400px] text-wrap">
                  <Badge
                    className={getSignificanciaBadgeColor(
                      mapNivelSignificancia(risco.nivelSignificancia),
                    )}
                  >
                    <small className="text-xs leading-none font-medium">
                      {risco.significancia} |{" "}
                      {mapNivelSignificancia(risco.nivelSignificancia)}
                    </small>
                  </Badge>
                </div>
              </TableCell>
              <TableCell className="text-right">
                {isUserEditor && (
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        aria-label="Open menu"
                        size="icon-sm"
                      >
                        <MoreHorizontalIcon />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40" align="end">
                      <DropdownMenuLabel>
                        <strong>Ações</strong>
                      </DropdownMenuLabel>
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          onSelect={() => handleOnEditButtonPressed(risco)}
                        >
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => handleOnDeleteButtonPressed(risco)}
                        >
                          Deletar
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuGroup>
                        <DropdownMenuLabel>
                          <strong>Plano de Ação</strong>
                        </DropdownMenuLabel>
                        <DropdownMenuItem
                          onSelect={() => handleOnAddPlanoPressed(risco)}
                        >
                          {risco.planoDeAcao ? "Gerenciar Plano" : "Adicionar Plano"}
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editDialogControlledOpen ? (
        <AddEditRiscoDialog
          controlledOpen={editDialogControlledOpen}
          setControlledOpen={setEditDialogControlledOpen}
          isEdit={true}
          gheId={gheId ?? ""}
          risco={targetRisco!}
        />
      ) : null}

      {planoDialogOpen && targetRisco ? (
        <PlanoDeAcaoDialog
          controlledOpen={planoDialogOpen}
          setControlledOpen={setPlanoDialogOpen}
          gheId={gheId ?? ""}
          riscoId={targetRisco.id}
          planoDeAcao={targetRisco.planoDeAcao}
        />
      ) : null}
    </div>
  );
}
