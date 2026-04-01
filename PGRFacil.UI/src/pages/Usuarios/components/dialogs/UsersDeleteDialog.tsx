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
import type { Usuario } from "@/pages/Usuarios/models/Usuario";
import { Button } from "@/components/ui/button";
import { UsuarioService } from "../../services/UsuarioService";

interface Props {
  controlledOpen: boolean;
  setControlledOpen: Dispatch<SetStateAction<boolean>>;
  user: Usuario;
}

export function UsersDeleteDialog({
  controlledOpen,
  setControlledOpen,
  user,
}: Props) {
  const queryClient = useQueryClient();

  const handleSuccess = () => {
    setControlledOpen(false);
    queryClient.invalidateQueries({ queryKey: [QueryKeys.GetUsers] });
  };

  const { mutate } = useMutation({
    mutationFn: UsuarioService.delete,
    onSuccess: handleSuccess,
  });

  const handleDeleteButtonPressed = () => {
    mutate(user.id);
  };

  return (
    <Dialog open={controlledOpen} onOpenChange={setControlledOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deletar Usuário</DialogTitle>
          <DialogDescription>
            Você tem certeza que deseja excluir o usuário {user.email}?
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
