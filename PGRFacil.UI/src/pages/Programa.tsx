import { AddEditRiscoDialog } from "@/components/dialogs/AddEditRiscoDialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  const [editDialogControlledOpen, setEditDialogControlledOpen] = useState(false);

  const queryClient = useQueryClient();

  const handleOnDeleteSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["Riscos"] });
  }

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
            <TableHead>Local</TableHead>
            <TableHead>Atividades</TableHead>
            <TableHead>Perigos</TableHead>
            <TableHead>Danos</TableHead>
            <TableHead>Agentes de Risco</TableHead>
            <TableHead>Tipo de Avaliação</TableHead>
            <TableHead>Severidade</TableHead>
            <TableHead>Probabilidade</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {riscosData?.data.map((risco) => (
            <TableRow key={risco.guid}>
              <TableCell>{risco.local}</TableCell>
              <TableCell>{risco.atividades}</TableCell>
              <TableCell>{risco.perigos}</TableCell>
              <TableCell>{risco.danos}</TableCell>
              <TableCell>{risco.agentesDeRisco}</TableCell>
              <TableCell>{risco.tipoDeAvaliacao}</TableCell>
              <TableCell>{risco.severidade}</TableCell>
              <TableCell>{risco.probabilidade}</TableCell>
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
