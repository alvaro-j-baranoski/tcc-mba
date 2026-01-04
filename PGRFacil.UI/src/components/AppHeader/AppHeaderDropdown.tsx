import { LogOut, MoreHorizontalIcon, Users } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function AppHeaderDropdown() {
  const navigate = useNavigate();
  const { user, logout: logoutAuth } = useAuth();
  const isUserEditor = user?.roles.includes("Editor");

  const logout = () => {
    logoutAuth();
    navigate("/login");
  };

  const manageUsers = () => {
    navigate("/users");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" aria-label="Open header menu" size="icon-sm">
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          {isUserEditor && (
            <DropdownMenuItem onClick={() => manageUsers()}>
              <Users size={16} />
              <span>Gerenciar usuários</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => logout()} variant="destructive">
            <LogOut size={16} />
            <span>Sair</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
