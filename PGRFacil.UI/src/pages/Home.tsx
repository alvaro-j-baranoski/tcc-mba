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
import { FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";

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
    refetchOnWindowFocus: false,
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
        <Button onClick={handleOnAddButtonPressed}><FaPlus/></Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Responsável</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listOfProgramas.map((programa) => (
            <TableRow key={programa.guid}>
              <TableCell>{programa.nome}</TableCell>
              <TableCell>João Silva</TableCell>
              <TableCell className="text-right">
                <Button className="mr-2" onClick={() => handleOnEditButtonPressed(programa)}>
                  <FaPencilAlt />
                </Button>
                <Button onClick={() => handleOnDeleteButtonPressed(programa)}>
                  <FaTrash />
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
