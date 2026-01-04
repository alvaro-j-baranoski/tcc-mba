import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { User } from "@/models/login/User";
import { MoreHorizontalIcon } from "lucide-react";
import { useState } from "react";
import { UsersDeleteDialog } from "./dialogs/UsersDeleteDialog";

export default function UsersTableDropdown({ user }: { user: User }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const onEditButtonPressed = () => {
    
  };
  const onDeleteButtonPressed = () => {
    console.log("setting delete to true");
    setDeleteDialogOpen(true);
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" aria-label="Open menu" size="icon-sm">
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuLabel>
          <strong>Ações</strong>
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem
            onSelect={() => {
              onEditButtonPressed();
            }}
          >
            Editar Funções
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onSelect={() => {
              onDeleteButtonPressed();
            }}
          >
            Deletar
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>

      {deleteDialogOpen ? (
        <UsersDeleteDialog
          controlledOpen={deleteDialogOpen}
          setControlledOpen={setDeleteDialogOpen}
          user={user}
        />
      ) : null}
    </DropdownMenu>
  );
}
