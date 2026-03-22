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
import { GheService } from "@/pages/Home/services/GheService";
import type { Ghe } from "@/pages/Home/models/Ghe";
import { QueryKeys } from "@/lib/utils";

interface Props {
  controlledOpen: boolean;
  setControlledOpen: Dispatch<SetStateAction<boolean>>;
  isEdit: boolean;
  ghe?: Ghe;
}

export function AddEditGheDialog({
  controlledOpen,
  setControlledOpen,
  isEdit,
  ghe: ghe,
}: Props) {
  const [gheName, setGheName] = useState(isEdit && ghe ? ghe.nome : "");
  const queryClient = useQueryClient();

  const handleSuccess = () => {
    setControlledOpen(false);
    setGheName("");
    queryClient.invalidateQueries({ queryKey: [QueryKeys.GetGhes] });
  };

  const { mutate: addMutate, isPending: addIsPending } = useMutation({
    mutationFn: GheService.addGhe,
    onSuccess: handleSuccess,
  });

  const { mutate: editMutate, isPending: editIsPending } = useMutation({
    mutationFn: GheService.editGhe,
    onSuccess: handleSuccess,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit && ghe) {
      editMutate({ id: ghe.id, nome: gheName });
    } else {
      addMutate({ nome: gheName });
    }
  };

  return (
    <Dialog open={controlledOpen} onOpenChange={setControlledOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Editar" : "Adicionar"} um {isEdit ? "" : "novo"} GHE
          </DialogTitle>
          <DialogDescription>Escolha o nome do GHE.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ghe-name">Nome do GHE</Label>
            <Input
              id="ghe-name"
              placeholder="Insira o nome do GHE"
              value={gheName}
              onChange={(e) => setGheName(e.target.value)}
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
              disabled={addIsPending || editIsPending || !gheName.trim()}
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
