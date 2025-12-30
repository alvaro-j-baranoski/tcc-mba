import { LogOut, User } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { LoginService } from "@/services/LoginService";

export function AppHeader() {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  const logout = () => {
    LoginService.logout();
    navigate("/login");
  };

  return (
    <header className="w-full bg-white border-b border-gray-100 px-8 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-zinc-950 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <span className="font-semibold text-gray-900">PGR Fácil</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
              <User size={16} />
            </div>
            <span className="font-medium">{email}</span>
          </div>
          <Button onClick={logout} aria-label="Log out">
            <LogOut size={16} />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
