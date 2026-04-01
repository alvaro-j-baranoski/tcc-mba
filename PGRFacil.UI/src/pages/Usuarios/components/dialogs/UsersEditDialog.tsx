import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, type Dispatch, type SetStateAction } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "@/lib/utils";
import { UsersService } from "@/services/UsersService";
import type { User } from "@/models/users/User";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface Props {
  controlledOpen: boolean;
  setControlledOpen: Dispatch<SetStateAction<boolean>>;
  user: User;
}

export function UsersEditDialog({
  controlledOpen,
  setControlledOpen,
  user,
}: Props) {
  const [roleEditorCheck, setRoleEditorCheck] = useState(
    user.roles.includes("Editor")
  );
  const [roleReaderCheck, setRoleReaderCheck] = useState(
    user.roles.includes("Reader")
  );

  const queryClient = useQueryClient();

  const handleSuccess = () => {
    setControlledOpen(false);
    queryClient.invalidateQueries({ queryKey: [QueryKeys.GetUsers] });
  };

  const { mutate } = useMutation({
    mutationFn: UsersService.update,
    onSuccess: handleSuccess,
  });

  const handleEditButtonPressed = () => {
    const roles: string[] = [];

    if (roleEditorCheck) {
      roles.push("Editor");
    }

    if (roleReaderCheck) {
      roles.push("Reader");
    }

    mutate({ id: user.id, payload: { roles: roles } });
  };

  return (
    <Dialog open={controlledOpen} onOpenChange={setControlledOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Funções de Usuário</DialogTitle>
          <DialogDescription>
            Editar funções do usuário {user.email}.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <Checkbox
              id="Editor"
              checked={roleEditorCheck}
              onCheckedChange={(c) => setRoleEditorCheck(c === true)}
            />
            <Label htmlFor="Editor">Editor</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox
              id="Reader"
              checked={roleReaderCheck}
              onCheckedChange={(c) => setRoleReaderCheck(c === true)}
            />
            <Label htmlFor="Reader">Leitor</Label>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleEditButtonPressed}>Editar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
