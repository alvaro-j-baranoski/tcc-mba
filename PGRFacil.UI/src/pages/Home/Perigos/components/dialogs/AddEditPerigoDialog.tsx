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
import { QueryKeys } from "@/lib/utils";
import type { Perigo } from "../../models/Perigo";
import { PerigosService } from "../../services/PerigosService";

interface Props {
  controlledOpen: boolean;
  setControlledOpen: Dispatch<SetStateAction<boolean>>;
  isEdit: boolean;
  perigo?: Perigo;
}

export function AddEditPerigoDialog({
  controlledOpen,
  setControlledOpen,
  isEdit,
  perigo,
}: Props) {
  const [descricao, setDescricao] = useState(isEdit && perigo ? perigo.descricao : "");
  const queryClient = useQueryClient();

  const handleSuccess = () => {
    setControlledOpen(false);
    setDescricao("");
    queryClient.invalidateQueries({ queryKey: [QueryKeys.GetPerigos] });
  };

  const { mutate: addMutate, isPending: addIsPending } = useMutation({
    mutationFn: PerigosService.addPerigo,
    onSuccess: handleSuccess,
  });

  const { mutate: editMutate, isPending: editIsPending } = useMutation({
    mutationFn: PerigosService.editPerigo,
    onSuccess: handleSuccess,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit && perigo) {
      editMutate({ id: perigo.id, descricao });
    } else {
      addMutate({ descricao });
    }
  };

  return (
    <Dialog open={controlledOpen} onOpenChange={setControlledOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Editar" : "Adicionar"} um {isEdit ? "" : "novo"} Perigo
          </DialogTitle>
          <DialogDescription>Escolha a descrição do Perigo.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="perigo-descricao">Descrição do Perigo</Label>
            <Input
              id="perigo-descricao"
              placeholder="Insira a descrição do Perigo"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
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
              disabled={addIsPending || editIsPending || !descricao.trim()}
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
