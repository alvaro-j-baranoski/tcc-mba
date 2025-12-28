import { AddEditRiscoDialog } from "@/components/dialogs/AddEditRiscoDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AgentesDeRisco } from "@/models/AgentesDeRisco";
import type { Risco } from "@/models/Risco";
import { ProgramasService } from "@/services/ProgramasService";
import { RiscosService } from "@/services/RiscosService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";

export default function Programa() {
  const { programaGuid } = useParams<{ programaGuid: string }>();
  const [targetRisco, setTargetRisco] = useState<Risco | null>(null);
  const [addDialogControlledOpen, setAddDialogControlledOpen] = useState(false);
  const [editDialogControlledOpen, setEditDialogControlledOpen] =
    useState(false);

  const queryClient = useQueryClient();

  const handleOnDeleteSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["Riscos"] });
  };

  const { data: programaData } = useQuery({
    queryKey: ["programaByID"],
    queryFn: ProgramasService.getProgramaByID.bind(null, programaGuid ?? ""),
    refetchOnWindowFocus: false,
  });

  const { data: riscosData } = useQuery({
    queryKey: ["Riscos"],
    queryFn: RiscosService.getRiscos.bind(null, programaGuid ?? ""),
    refetchOnWindowFocus: false,
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: RiscosService.deleteRisco,
    onSuccess: handleOnDeleteSuccess,
  });

  const handleOnAddButtonPressed = () => {
    setAddDialogControlledOpen(true);
  };

  const handleOnEditButtonPressed = (risco: Risco) => {
    setTargetRisco(risco);
    setEditDialogControlledOpen(true);
  };

  const handleOnDeleteButtonPressed = (risco: Risco) => {
    deleteMutate({ programaGuid: programaGuid ?? "", riscoGuid: risco.guid });
  };

  const getSignificanciaText = (significancia: number) => {
    if (significancia <= 2) {
      return "Baixa";
    }
    if (significancia <= 6) {
      return "Média";
    } else {
      return "Alta";
    }
  };

  const getSignificanciaBadgeColor = (significancia: number) => {
    if (significancia <= 2) {
      return "bg-green-600 text-white hover:bg-green-700";
    }
    if (significancia <= 6) {
      return "bg-yellow-600 text-white hover:bg-yellow-700";
    } else {
      return "bg-red-600 text-white hover:bg-red-700";
    }
  };

  return (
    <div className="flex min-h-svh flex-col my-8 mx-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">{programaData?.data.nome}</h1>
        <Button onClick={handleOnAddButtonPressed}>
          <FaPlus />
        </Button>
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
            <TableHead className="text-right">
              <strong>Ações</strong>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {riscosData?.data.map((risco) => (
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
                    {risco.atividades}
                  </small>
                </div>
              </TableCell>
              <TableCell>
                <div className="max-w-[400px] text-wrap">
                  <small className="text-xs leading-none font-medium">
                    {risco.perigos}
                  </small>
                </div>
              </TableCell>
              <TableCell>
                <div className="max-w-[400px] text-wrap">
                  <small className="text-xs leading-none font-medium">
                    {risco.danos}
                  </small>
                </div>
              </TableCell>
              <TableCell>
                <div className="max-w-[400px] text-wrap">
                  <small className="text-xs leading-none font-medium">
                    {
                      AgentesDeRisco.find((a) => a.key === risco.agentesDeRisco)
                        ?.value
                    }
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
                  <Badge className={getSignificanciaBadgeColor(risco.significancia)}>
                    <small className="text-xs leading-none font-medium">
                      {risco.significancia} | {getSignificanciaText(risco.significancia)}
                    </small>
                  </Badge>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  className="mr-2"
                  onClick={() => handleOnEditButtonPressed(risco)}
                >
                  <FaPencilAlt />
                </Button>
                <Button onClick={() => handleOnDeleteButtonPressed(risco)}>
                  <FaTrash />
                </Button>
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
  );
}
