import { AddEditNewProgramaDialog } from "@/pages/Home/components/dialogs/AddEditNewProgramaDialog";
import { DeleteProgramaDialog } from "@/pages/Home/components/dialogs/DeleteProgramaDialog";
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
import { formatDate } from "@/lib/dateUtils";
import { QueryKeys } from "@/lib/utils";
import type { Programa } from "@/models/programs/Programa";
import { ProgramsService } from "@/services/ProgramasService";
import { useQuery } from "@tanstack/react-query";
import { MoreHorizontalIcon } from "lucide-react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProgramasTable() {
  const [targetPrograma, setTargetPrograma] = useState<Programa | null>(null);
  const [deleteDialogControlledOpen, setDeleteDialogControlledOpen] =
    useState(false);
  const [editDialogControlledOpen, setEditDialogControlledOpen] =
    useState(false);
  const [addDialogControlledOpen, setAddDialogControlledOpen] = useState(false);
  const { isUserEditor } = useAuth();
  const navigate = useNavigate();

  const { data, isPending } = useQuery({
    queryKey: [QueryKeys.GetProgramas],
    queryFn: ProgramsService.getPrograms,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
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
    <div className="flex min-h-svh flex-col m-8 p-6 bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Programas</h1>
        {isUserEditor && (
          <Button disabled={isPending} onClick={handleOnAddButtonPressed}>
            <FaPlus />
            <span className="ml-2">Adicionar Programa</span>
          </Button>
        )}
      </div>

      {!isPending ? (
        <Table className="w-full text-left border-collapse">
          <TableHeader>
            <TableRow>
              <TableHead>
                <strong>Nome</strong>
              </TableHead>
              <TableHead>
                <strong>Versão</strong>
              </TableHead>
              <TableHead>
                <strong>Número de riscos</strong>
              </TableHead>
              <TableHead>
                <strong>Atualizado</strong>
              </TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100">
            {listOfProgramas.map((programa) => (
              <TableRow
                key={programa.guid}
                className="hover:bg-gray-100 transition-colors group cursor-pointer"
                onClick={() => {
                  navigate(`/programa/${programa.guid}`);
                }}
              >
                <TableCell>{programa.name}</TableCell>
                <TableCell>{programa.version}</TableCell>
                <TableCell>{programa.numberOfRisks}</TableCell>
                <TableCell>{formatDate(programa.updatedOn)}</TableCell>
                <TableCell className="text-right">
                  {isUserEditor && (
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          aria-label="Open menu"
                          size="icon-sm"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreHorizontalIcon />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="w-40"
                        align="end"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <DropdownMenuLabel>
                          <strong>Ações</strong>
                        </DropdownMenuLabel>
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            onSelect={() => {
                              handleOnEditButtonPressed(programa);
                            }}
                          >
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={() => {
                              handleOnDeleteButtonPressed(programa);
                            }}
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
      ) : (
        <Skeleton
          count={10}
          height={40}
          wrapper={({ children }) => <div className="mb-4">{children}</div>}
        />
      )}

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
