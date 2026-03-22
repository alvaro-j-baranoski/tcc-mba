import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { type Dispatch, type SetStateAction } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "@/lib/utils";
import type { Dano } from "../../models/Dano";
import { DanosService } from "../../services/DanosService";
import { Button } from "@/components/ui/button";

interface Props {
  controlledOpen: boolean;
  setControlledOpen: Dispatch<SetStateAction<boolean>>;
  dano: Dano;
}

export function DeleteDanoDialog({
  controlledOpen,
  setControlledOpen,
  dano,
}: Props) {
  const queryClient = useQueryClient();

  const handleSuccess = () => {
    setControlledOpen(false);
    queryClient.invalidateQueries({ queryKey: [QueryKeys.GetDanos] });
  };

  const { mutate } = useMutation({
    mutationFn: DanosService.deleteDano,
    onSuccess: handleSuccess,
  });

  const handleDeleteButtonPressed = () => {
    mutate(dano.id);
  };

  return (
    <Dialog open={controlledOpen} onOpenChange={setControlledOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir Dano</DialogTitle>
          <DialogDescription>
            Você tem certeza que deseja excluir o Dano "{dano.descricao}"?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button variant="destructive" onClick={handleDeleteButtonPressed}>
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
