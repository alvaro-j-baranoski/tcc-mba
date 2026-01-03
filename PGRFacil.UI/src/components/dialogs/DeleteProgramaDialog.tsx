import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Programa } from "@/models/programs/Programa";
import { type Dispatch, type SetStateAction } from "react";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProgramsService } from "@/services/ProgramasService";
import { QueryKeys } from "@/lib/utils";

interface Props {
  controlledOpen: boolean;
  setControlledOpen: Dispatch<SetStateAction<boolean>>;
  programa: Programa;
}

export function DeleteProgramaDialog({
  controlledOpen,
  setControlledOpen,
  programa,
}: Props) {
  const queryClient = useQueryClient();

  const handleSuccess = () => {
    setControlledOpen(false);
    queryClient.invalidateQueries({ queryKey: [QueryKeys.GetProgramas] });
  };

  const { mutate } = useMutation({
    mutationFn: ProgramsService.deleteProgram,
    onSuccess: handleSuccess,
  });

  const handleDeleteButtonPressed = () => {
    mutate(programa.guid);
  };

  return (
    <Dialog open={controlledOpen} onOpenChange={setControlledOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deletar Programa</DialogTitle>
          <DialogDescription>
            Você tem certeza que deseja excluir o programa {programa.name}?
            Todos os riscos associados com esse programa também serão excluídos.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button variant="destructive" onClick={handleDeleteButtonPressed}>
            Deletar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
