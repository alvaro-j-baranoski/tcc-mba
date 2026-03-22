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
import type { Ghe } from "../../models/Ghe";
import { GheService } from "../../services/GheService";
import { Button } from "@/components/ui/button";

interface Props {
  controlledOpen: boolean;
  setControlledOpen: Dispatch<SetStateAction<boolean>>;
  ghe: Ghe;
}

export function DeleteGheDialog({
  controlledOpen,
  setControlledOpen,
  ghe,
}: Props) {
  const queryClient = useQueryClient();

  const handleSuccess = () => {
    setControlledOpen(false);
    queryClient.invalidateQueries({ queryKey: [QueryKeys.GetGhes] });
  };

  const { mutate } = useMutation({
    mutationFn: GheService.deleteGhe,
    onSuccess: handleSuccess,
  });

  const handleDeleteButtonPressed = () => {
    mutate(ghe.id);
  };

  return (
    <Dialog open={controlledOpen} onOpenChange={setControlledOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir GHE</DialogTitle>
          <DialogDescription>
            Você tem certeza que deseja excluir o GHE {ghe.nome}?
            Todos os riscos associados com esse GHE também serão excluídos.
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
