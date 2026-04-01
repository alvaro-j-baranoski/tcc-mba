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
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { QueryKeys } from "@/lib/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { MoreVerticalIcon, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import type { Dano } from "../models/Dano";
import { DanosService } from "../services/DanosService";
import { AddEditDanoDialog } from "./dialogs/AddEditDanoDialog";
import { DeleteDanoDialog } from "./dialogs/DeleteDanoDialog";
import { Spinner } from "@/components/ui/spinner";

export default function DanosTable() {
  const [targetDano, setTargetDano] = useState<Dano | null>(null);
  const [deleteDialogControlledOpen, setDeleteDialogControlledOpen] = useState(false);
  const [editDialogControlledOpen, setEditDialogControlledOpen] = useState(false);
  const [addDialogControlledOpen, setAddDialogControlledOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { isUserEditor } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const RESULT_LIMIT = 25;

  const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [QueryKeys.GetDanos, debouncedSearch],
    queryFn: ({ pageParam }) => {
      if (pageParam) {
        return DanosService.getByNextLink(pageParam);
      }
      return DanosService.getDanos(debouncedSearch || undefined, RESULT_LIMIT);
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.data["@nextLink"] ?? undefined,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const listOfDanos = data?.pages.flatMap((page) => page.data.items) || [];

  const handleOnAddButtonPressed = () => {
    setAddDialogControlledOpen(true);
  };

  const handleOnEditButtonPressed = (dano: Dano) => {
    setTargetDano(dano);
    setEditDialogControlledOpen(true);
  };

  const handleOnDeleteButtonPressed = (dano: Dano) => {
    setTargetDano(dano);
    setDeleteDialogControlledOpen(true);
  };

  return (
    <div className="flex flex-col m-8 p-6 bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Danos</h1>
        {isUserEditor && (
          <Button disabled={isFetching} onClick={handleOnAddButtonPressed}>
            <FaPlus />
            <span className="ml-2">Adicionar Dano</span>
          </Button>
        )}
      </div>

      <div className="relative mb-4 max-w-sm">
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          placeholder="Buscar danos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {!isFetching || isFetchingNextPage ? (
        <div className="flex flex-wrap gap-2">
          {listOfDanos.map((dano) => (
            <div key={dano.id} className="flex items-center">
              {isUserEditor ? (
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <button className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer">
                      {dano.descricao}
                      <MoreVerticalIcon className="h-3.5 w-3.5 text-slate-400" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40" align="end">
                    <DropdownMenuLabel>
                      <strong>Ações</strong>
                    </DropdownMenuLabel>
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        onSelect={() => handleOnEditButtonPressed(dano)}
                      >
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() => handleOnDeleteButtonPressed(dano)}
                      >
                        Deletar
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Badge variant="secondary">{dano.descricao}</Badge>
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

      {hasNextPage && (
        <div className="flex justify-center pt-4">
          <Button
            variant="outline"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? <Spinner /> : "Carregar mais"}
          </Button>
        </div>
      )}

      {deleteDialogControlledOpen ? (
        <DeleteDanoDialog
          controlledOpen={deleteDialogControlledOpen}
          setControlledOpen={setDeleteDialogControlledOpen}
          dano={targetDano!}
        />
      ) : null}
      {addDialogControlledOpen ? (
        <AddEditDanoDialog
          controlledOpen={addDialogControlledOpen}
          setControlledOpen={setAddDialogControlledOpen}
          isEdit={false}
        />
      ) : null}
      {editDialogControlledOpen ? (
        <AddEditDanoDialog
          controlledOpen={editDialogControlledOpen}
          setControlledOpen={setEditDialogControlledOpen}
          isEdit={true}
          dano={targetDano!}
        />
      ) : null}
    </div>
  );
}
