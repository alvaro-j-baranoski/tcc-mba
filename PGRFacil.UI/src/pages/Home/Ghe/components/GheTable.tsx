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
import { useQuery } from "@tanstack/react-query";
import { MoreHorizontalIcon } from "lucide-react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import type { Ghe } from "../models/Ghe";
import { GheService } from "../services/GheService";
import { AddEditGheDialog } from "./dialogs/AddEditGheDialog";
import { DeleteGheDialog } from "./dialogs/DeleteGheDialog";

export default function GheTable() {
  const [targetGhe, setTargetGhe] = useState<Ghe | null>(null);
  const [deleteDialogControlledOpen, setDeleteDialogControlledOpen] = useState(false);
  const [editDialogControlledOpen, setEditDialogControlledOpen] = useState(false);
  const [addDialogControlledOpen, setAddDialogControlledOpen] = useState(false);
  const { isUserEditor } = useAuth();
  const navigate = useNavigate();

  const { data, isFetching } = useQuery({
    queryKey: [QueryKeys.GetGhes],
    queryFn: GheService.getGhes,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const { data: listOfGhes } = data || { data: [] };

  const handleOnAddButtonPressed = () => {
    setAddDialogControlledOpen(true);
  };

  const handleOnEditButtonPressed = (ghe: Ghe) => {
    setTargetGhe(ghe);
    setEditDialogControlledOpen(true);
  };

  const handleOnDeleteButtonPressed = (ghe: Ghe) => {
    setTargetGhe(ghe);
    setDeleteDialogControlledOpen(true);
  };

  return (
    <div className="flex min-h-svh flex-col m-8 p-6 bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">GHEs</h1>
        {isUserEditor && (
          <Button disabled={isFetching} onClick={handleOnAddButtonPressed}>
            <FaPlus />
            <span className="ml-2">Adicionar GHE</span>
          </Button>
        )}
      </div>

      {!isFetching ? (
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
            {listOfGhes.map((ghe) => (
              <TableRow
                key={ghe.id}
                className="hover:bg-gray-100 transition-colors group cursor-pointer"
                onClick={() => {
                  navigate(`/programa/${ghe.id}`);
                }}
              >
                <TableCell>{ghe.nome}</TableCell>
                <TableCell>{ghe.versao}</TableCell>
                <TableCell>{ghe.numeroDeRiscos}</TableCell>
                <TableCell>{formatDate(ghe.atualizadoEm)}</TableCell>
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
                              handleOnEditButtonPressed(ghe);
                            }}
                          >
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={() => {
                              handleOnDeleteButtonPressed(ghe);
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
        <DeleteGheDialog
          controlledOpen={deleteDialogControlledOpen}
          setControlledOpen={setDeleteDialogControlledOpen}
          ghe={targetGhe!}
        />
      ) : null}
      {addDialogControlledOpen ? (
        <AddEditGheDialog
          controlledOpen={addDialogControlledOpen}
          setControlledOpen={setAddDialogControlledOpen}
          isEdit={false}
        />
      ) : null}
      {editDialogControlledOpen ? (
        <AddEditGheDialog
          controlledOpen={editDialogControlledOpen}
          setControlledOpen={setEditDialogControlledOpen}
          isEdit={true}
          ghe={targetGhe!}
        />
      ) : null}
    </div>
  );
}
