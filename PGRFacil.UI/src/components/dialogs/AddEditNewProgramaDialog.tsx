import { useState, type Dispatch, type SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProgramasService } from "@/services/ProgramasService";
import type { Programa } from "@/models/programas/Programa";
import { QueryKeys } from "@/lib/utils";

interface Props {
  controlledOpen: boolean;
  setControlledOpen: Dispatch<SetStateAction<boolean>>;
  isEdit: boolean;
  programa?: Programa;
}

export function AddEditNewProgramaDialog({
  controlledOpen,
  setControlledOpen,
  isEdit,
  programa,
}: Props) {
  const [programaName, setProgramaName] = useState(
    isEdit && programa ? programa.nome : ""
  );
  const queryClient = useQueryClient();

  const handleSuccess = () => {
    setControlledOpen(false);
    setProgramaName("");
    queryClient.invalidateQueries({ queryKey: [QueryKeys.GetProgramas] });
  };

  const { mutate: addMutate, isPending: addIsPending } = useMutation({
    mutationFn: ProgramasService.addNewPrograma,
    onSuccess: handleSuccess,
  });

  const { mutate: editMutate, isPending: editIsPending } = useMutation({
    mutationFn: ProgramasService.editPrograma,
    onSuccess: handleSuccess,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit && programa) {
      editMutate({ guid: programa.guid, nome: programaName });
    } else {
      addMutate({ nome: programaName });
    }
  };

  return (
    <Dialog open={controlledOpen} onOpenChange={setControlledOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Editar" : "Adicionar"} um {isEdit ? "" : "novo"} programa
          </DialogTitle>
          <DialogDescription>Escolha o nome do programa.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="programa-name">Nome do programa</Label>
            <Input
              id="programa-name"
              placeholder="Insira o nome do programa"
              value={programaName}
              onChange={(e) => setProgramaName(e.target.value)}
              disabled={addIsPending || editIsPending}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setControlledOpen(false)}
              disabled={addIsPending || editIsPending}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={addIsPending || editIsPending || !programaName.trim()}
            >
              {addIsPending || editIsPending
                ? isEdit
                  ? "Editando..."
                  : "Criando..."
                : isEdit
                ? "Editar"
                : "Criar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
