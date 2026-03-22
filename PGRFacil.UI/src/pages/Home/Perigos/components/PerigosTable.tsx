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
import { useAuth } from "@/hooks/useAuth";
import { QueryKeys } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { MoreVerticalIcon } from "lucide-react";
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
    <div className="flex flex-col m-8 p-6 bg-white rounded-xl shadow-sm border border-slate-200">
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
        <div className="flex flex-wrap gap-2">
          {listOfPerigos.map((perigo) => (
            <div key={perigo.id} className="flex items-center">
              {isUserEditor ? (
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <button className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer">
                      {perigo.descricao}
                      <MoreVerticalIcon className="h-3.5 w-3.5 text-slate-400" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40" align="end">
                    <DropdownMenuLabel>
                      <strong>Ações</strong>
                    </DropdownMenuLabel>
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        onSelect={() => handleOnEditButtonPressed(perigo)}
                      >
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() => handleOnDeleteButtonPressed(perigo)}
                      >
                        Deletar
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Badge variant="secondary">{perigo.descricao}</Badge>
              )}
            </div>
          ))}
        </div>
      ) : (
        <Skeleton
          count={3}
          height={32}
          width={150}
          inline
          wrapper={({ children }) => <div className="flex gap-2">{children}</div>}
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