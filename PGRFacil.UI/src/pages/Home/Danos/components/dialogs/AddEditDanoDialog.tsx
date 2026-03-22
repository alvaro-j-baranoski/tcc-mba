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
import type { Dano } from "../../models/Dano";
import { DanosService } from "../../services/DanosService";

interface Props {
  controlledOpen: boolean;
  setControlledOpen: Dispatch<SetStateAction<boolean>>;
  isEdit: boolean;
  dano?: Dano;
}

export function AddEditDanoDialog({
  controlledOpen,
  setControlledOpen,
  isEdit,
  dano,
}: Props) {
  const [descricao, setDescricao] = useState(isEdit && dano ? dano.descricao : "");
  const queryClient = useQueryClient();

  const handleSuccess = () => {
    setControlledOpen(false);
    setDescricao("");
    queryClient.invalidateQueries({ queryKey: [QueryKeys.GetDanos] });
  };

  const { mutate: addMutate, isPending: addIsPending } = useMutation({
    mutationFn: DanosService.addDano,
    onSuccess: handleSuccess,
  });

  const { mutate: editMutate, isPending: editIsPending } = useMutation({
    mutationFn: DanosService.editDano,
    onSuccess: handleSuccess,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit && dano) {
      editMutate({ id: dano.id, descricao });
    } else {
      addMutate({ descricao });
    }
  };

  return (
    <Dialog open={controlledOpen} onOpenChange={setControlledOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Editar" : "Adicionar"} um {isEdit ? "" : "novo"} Dano
          </DialogTitle>
          <DialogDescription>Escolha a descrição do Dano.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dano-descricao">Descrição do Dano</Label>
            <Input
              id="dano-descricao"
              placeholder="Insira a descrição do Dano"
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
