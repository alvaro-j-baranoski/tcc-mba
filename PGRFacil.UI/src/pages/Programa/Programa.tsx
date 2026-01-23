import { AppHeader } from "@/components/AppHeader/AppHeader";
import { AddEditRiscoDialog } from "@/components/dialogs/AddEditRiscoDialog";
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
import { mapNivelSignificancia, QueryKeys } from "@/lib/utils";
import { AgentesDeRisco } from "@/models/AgentesDeRisco";
import type { Risk } from "@/models/Risk";
import { ProgramsService } from "@/services/ProgramasService";
import { RisksService } from "@/services/RisksService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MoreHorizontalIcon } from "lucide-react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import ProgramaBackButton from "./components/ProgramaBackButton";
import ProgramaTitle from "./components/ProgramaTitle";
import ProgramaVersion from "./components/ProgramaVersion";
import ProgramaRiscosCadastrados from "./components/ProgramaRiscosCadastrados";
import ProgramaAtualizadoEm from "./components/ProgramaAtualizadoEm";

export default function Programa() {
  const { programaGuid } = useParams<{ programaGuid: string }>();
  const [targetRisco, setTargetRisco] = useState<Risk | null>(null);
  const [addDialogControlledOpen, setAddDialogControlledOpen] = useState(false);
  const [editDialogControlledOpen, setEditDialogControlledOpen] =
    useState(false);
  const { isUserEditor } = useAuth();

  const queryClient = useQueryClient();

  const handleOnDeleteSuccess = () => {
    invalidateQueriesForUpdatesOnRisco(queryClient, programaGuid!);
  };

  const { data: programaData } = useQuery({
    queryKey: [QueryKeys.GetProgramaByID(programaGuid!)],
    queryFn: ProgramsService.getProgramByID.bind(null, programaGuid ?? ""),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const { data: riscosData } = useQuery({
    queryKey: [QueryKeys.GetRiscos(programaGuid!)],
    queryFn: RisksService.getRisks.bind(null, programaGuid ?? ""),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: RisksService.deleteRisco,
    onSuccess: handleOnDeleteSuccess,
  });

  const handleOnAddButtonPressed = () => {
    setAddDialogControlledOpen(true);
  };

  const handleOnEditButtonPressed = (risco: Risk) => {
    setTargetRisco(risco);
    setEditDialogControlledOpen(true);
  };

  const handleOnDeleteButtonPressed = (risco: Risk) => {
    deleteMutate({ programGuid: programaGuid ?? "", riskGuid: risco.guid });
  };

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
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <AppHeader />
      <div className="flex min-h-svh flex-col my-8 mx-8">
        <div className="space-y-6">
          <ProgramaBackButton />
          <div className="flex flex-col gap-3">
            <ProgramaTitle programaName={programaData?.data?.name} />

            <div className="flex items-center gap-3 text-sm text-gray-500 pb-6">
              <ProgramaVersion version={programaData?.data?.version} />
              <span className="text-gray-300">•</span>
              <ProgramaRiscosCadastrados numberOfRisks={riscosData?.data?.length} />
              <span className="text-gray-300">•</span>
              <ProgramaAtualizadoEm updatedOn={programaData?.data?.updatedOn} />
              {isUserEditor && (
                <Button onClick={handleOnAddButtonPressed} className="ml-auto">
                  <FaPlus />
                  <span>Adicionar Risco</span>
                </Button>
              )}
            </div>
          </div>
        </div>

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
            {riscosData?.data?.map((risco) => (
              <TableRow key={risco.guid}>
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
                      {risco.activites}
                    </small>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-[400px] text-wrap">
                    <small className="text-xs leading-none font-medium">
                      {risco.dangers}
                    </small>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-[400px] text-wrap">
                    <small className="text-xs leading-none font-medium">
                      {risco.damages}
                    </small>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-[400px] text-wrap">
                    <small className="text-xs leading-none font-medium">
                      {AgentesDeRisco.find((a) => a.key === risco.agent)?.value}
                    </small>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-[400px] text-wrap">
                    <small className="text-xs leading-none font-medium">
                      {risco.assessementType}
                    </small>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-[400px] text-wrap">
                    <small className="text-xs leading-none font-medium">
                      {risco.severity}
                    </small>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-[400px] text-wrap">
                    <small className="text-xs leading-none font-medium">
                      {risco.probability}
                    </small>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-[400px] text-wrap">
                    <Badge
                      className={getSignificanciaBadgeColor(
                        mapNivelSignificancia(risco.significanceLevel),
                      )}
                    >
                      <small className="text-xs leading-none font-medium">
                        {risco.significance} |{" "}
                        {mapNivelSignificancia(risco.significanceLevel)}
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
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {addDialogControlledOpen ? (
          <AddEditRiscoDialog
            controlledOpen={addDialogControlledOpen}
            setControlledOpen={setAddDialogControlledOpen}
            isEdit={false}
            programaGuid={programaGuid ?? ""}
          />
        ) : null}
        {editDialogControlledOpen ? (
          <AddEditRiscoDialog
            controlledOpen={editDialogControlledOpen}
            setControlledOpen={setEditDialogControlledOpen}
            isEdit={true}
            programaGuid={programaGuid ?? ""}
            risco={targetRisco!}
          />
        ) : null}
      </div>
    </div>
  );
}
