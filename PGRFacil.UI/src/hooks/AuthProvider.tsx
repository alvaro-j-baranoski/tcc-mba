import type { Usuario } from "@/pages/Usuarios/models/Usuario";
import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { LoginResponse } from "@/pages/Login/LoginResponse";
import { useNavigate } from "react-router-dom";
import { onUnauthorized } from "@/services/client";
import { toast } from "sonner";

// Provider props type
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<Usuario | null>(() => {
    const savedUser = localStorage.getItem("userData");
    if (savedUser) {
      return JSON.parse(savedUser) as Usuario;
    } else {
      return null;
    }
  });

  const navigate = useNavigate();

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    // Handle global unauthorized errors. Will listen only once during the app lifecycle.
    onUnauthorized(() => {
      console.log("[DEBUG] callback received!");
      toast.error("Sessão expirada. Por favor, faça login novamente.");
      logout();
      navigate("/login");
    });
  });

  const login = (loginResponse: LoginResponse) => {
    const userData: Usuario = {
      id: "",
      email: loginResponse.email,
      permissoes: loginResponse.permissoes,
    };
    setUser(userData);
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("token", loginResponse.token);
  };


  const isUserEditor = user?.permissoes.includes("Editor") ?? false;

  return (
    <AuthContext.Provider value={{ user, login, logout, isUserEditor }}>
      {children}
    </AuthContext.Provider>
  );
};
