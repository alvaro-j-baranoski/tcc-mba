import { useQuery } from "@tanstack/react-query";
import { ProgramsService } from "@/services/ProgramasService";
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
import type { Programa } from "@/models/programs/Programa";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AppHeader } from "@/components/AppHeader/AppHeader";
import { formatDate } from "@/lib/dateUtils";
import { RelatoriosService } from "@/services/RelatoriosService";
import { RiskMatrix } from "@/components/RiskMatrix";
import { QueryKeys } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontalIcon } from "lucide-react";

export default function Home() {
  const [targetPrograma, setTargetPrograma] = useState<Programa | null>(null);
  const [deleteDialogControlledOpen, setDeleteDialogControlledOpen] =
    useState(false);
  const [addDialogControlledOpen, setAddDialogControlledOpen] = useState(false);
  const [editDialogControlledOpen, setEditDialogControlledOpen] =
    useState(false);
  const navigate = useNavigate();

  const { data: matrizDeRiscoData } = useQuery({
    queryKey: [QueryKeys.GetMatrizDeRisco],
    queryFn: RelatoriosService.getMatrizDeRisco,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const { data } = useQuery({
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
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <AppHeader />
      {matrizDeRiscoData && <RiskMatrix data={matrizDeRiscoData.data} />}

      <div className="flex min-h-svh flex-col m-8 p-6 bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Programas</h1>
          <Button onClick={handleOnAddButtonPressed}>
            <FaPlus />
            <span className="ml-2">Adicionar Programa</span>
          </Button>
        </div>
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
    </div>
  );
}
