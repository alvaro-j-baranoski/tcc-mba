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
import { QueryKeys } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { MoreHorizontalIcon } from "lucide-react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import type { Perigo } from "../models/Perigo";
import { PerigosService } from "../services/PerigosService";
import { AddEditPerigoDialog } from "./dialogs/AddEditPerigoDialog";
import { DeletePerigoDialog } from "./dialogs/DeletePerigoDialog";

export default function PerigosTable() {
  const [targetPerigo, setTargetPerigo] = useState<Perigo | null>(null);
  const [deleteDialogControlledOpen, setDeleteDialogControlledOpen] = useState(false);
  const [editDialogControlledOpen, setEditDialogControlledOpen] = useState(false);
  const [addDialogControlledOpen, setAddDialogControlledOpen] = useState(false);
  const { isUserEditor } = useAuth();

  const { data, isFetching } = useQuery({
    queryKey: [QueryKeys.GetPerigos],
    queryFn: PerigosService.getPerigos,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const listOfPerigos = data?.data?.items || [];

  const handleOnAddButtonPressed = () => {
    setAddDialogControlledOpen(true);
  };

  const handleOnEditButtonPressed = (perigo: Perigo) => {
    setTargetPerigo(perigo);
    setEditDialogControlledOpen(true);
  };

  const handleOnDeleteButtonPressed = (perigo: Perigo) => {
    setTargetPerigo(perigo);
    setDeleteDialogControlledOpen(true);
  };

  return (
    <div className="flex min-h-svh flex-col m-8 p-6 bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Perigos</h1>
        {isUserEditor && (
          <Button disabled={isFetching} onClick={handleOnAddButtonPressed}>
            <FaPlus />
            <span className="ml-2">Adicionar Perigo</span>
          </Button>
        )}
      </div>

      {!isFetching ? (
        <Table className="w-full text-left border-collapse">
          <TableHeader>
            <TableRow>
              <TableHead>
                <strong>Descrição</strong>
              </TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100">
            {listOfPerigos.map((perigo) => (
              <TableRow
                key={perigo.id}
                className="hover:bg-gray-100 transition-colors group"
              >
                <TableCell>{perigo.descricao}</TableCell>
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
                              handleOnEditButtonPressed(perigo);
                            }}
                          >
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={() => {
                              handleOnDeleteButtonPressed(perigo);
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
        <DeletePerigoDialog
          controlledOpen={deleteDialogControlledOpen}
          setControlledOpen={setDeleteDialogControlledOpen}
          perigo={targetPerigo!}
        />
      ) : null}
      {addDialogControlledOpen ? (
        <AddEditPerigoDialog
          controlledOpen={addDialogControlledOpen}
          setControlledOpen={setAddDialogControlledOpen}
          isEdit={false}
        />
      ) : null}
      {editDialogControlledOpen ? (
        <AddEditPerigoDialog
          controlledOpen={editDialogControlledOpen}
          setControlledOpen={setEditDialogControlledOpen}
          isEdit={true}
          perigo={targetPerigo!}
        />
      ) : null}
    </div>
  );
}