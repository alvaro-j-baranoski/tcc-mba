import { useQuery } from "@tanstack/react-query";
import { ProgramasService } from "@/services/ProgramasService";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AddEditNewProgramaDialog } from "@/components/dialogs/AddEditNewProgramaDialog";
import { Button } from "@/components/ui/button";
import { DeleteProgramaDialog } from "@/components/dialogs/DeleteProgramaDialog";
import { useState } from "react";
import type { Programa } from "@/models/Programa";

export default function Home() {
  const [targetPrograma, setTargetPrograma] = useState<Programa | null>(null);
  const [deleteDialogControlledOpen, setDeleteDialogControlledOpen] =
    useState(false);
  const [addDialogControlledOpen, setAddDialogControlledOpen] = useState(false);
  const [editDialogControlledOpen, setEditDialogControlledOpen] =
    useState(false);

  const { data } = useQuery({
    queryKey: ["programas"],
    queryFn: ProgramasService.getProgramas,
  });

  const { data: listOfProgramas } = data || { data: [] };

  const handleOnAddButtonPressed = () => {
    setAddDialogControlledOpen(true);
  };

  const handleOnEditButtonPressed = (programa: Programa) => {
    setTargetPrograma(programa);
    setEditDialogControlledOpen(true);
  };

  const handleOnDeleteButtonPressed = (programa: Programa) => {
    setTargetPrograma(programa);
    setDeleteDialogControlledOpen(true);
  };

  return (
    <div className="flex min-h-svh flex-col my-8 mx-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Programas</h1>
        <Button onClick={handleOnAddButtonPressed}>Adicionar</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Responsável</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listOfProgramas.map((programa) => (
            <TableRow key={programa.guid}>
              <TableCell>{programa.nome}</TableCell>
              <TableCell>João Silva</TableCell>
              <TableCell>
                <Button onClick={() => handleOnEditButtonPressed(programa)}>
                  Editar
                </Button>
                <Button onClick={() => handleOnDeleteButtonPressed(programa)}>
                  Deletar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {deleteDialogControlledOpen ? (
        <DeleteProgramaDialog
          controlledOpen={deleteDialogControlledOpen}
          setControlledOpen={setDeleteDialogControlledOpen}
          programa={targetPrograma!}
        />
      ) : null}
      {addDialogControlledOpen ? (
        <AddEditNewProgramaDialog
          controlledOpen={addDialogControlledOpen}
          setControlledOpen={setAddDialogControlledOpen}
          isEdit={false}
        />
      ) : null}
      {editDialogControlledOpen ? (
        <AddEditNewProgramaDialog
          controlledOpen={editDialogControlledOpen}
          setControlledOpen={setEditDialogControlledOpen}
          isEdit={true}
          programa={targetPrograma!}
        />
      ) : null}
    </div>
  );
}
