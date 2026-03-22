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
import type { Perigo } from "../../models/Perigo";
import { PerigosService } from "../../services/PerigosService";
import { Button } from "@/components/ui/button";

interface Props {
  controlledOpen: boolean;
  setControlledOpen: Dispatch<SetStateAction<boolean>>;
  perigo: Perigo;
}

export function DeletePerigoDialog({
  controlledOpen,
  setControlledOpen,
  perigo,
}: Props) {
  const queryClient = useQueryClient();

  const handleSuccess = () => {
    setControlledOpen(false);
    queryClient.invalidateQueries({ queryKey: [QueryKeys.GetPerigos] });
  };

  const { mutate } = useMutation({
    mutationFn: PerigosService.deletePerigo,
    onSuccess: handleSuccess,
  });

  const handleDeleteButtonPressed = () => {
    mutate(perigo.id);
  };

  return (
    <Dialog open={controlledOpen} onOpenChange={setControlledOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir Perigo</DialogTitle>
          <DialogDescription>
            Você tem certeza que deseja excluir o Perigo "{perigo.descricao}"?
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
