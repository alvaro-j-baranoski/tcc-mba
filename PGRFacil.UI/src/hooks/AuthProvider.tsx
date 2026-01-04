import type { User } from "@/models/users/User";
import { useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { LoginResponse } from "@/models/login/LoginResponse";

// Provider props type
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("userData");
    if (savedUser) {
      return JSON.parse(savedUser) as User;
    } else {
      return null;
    }
  });

  const login = (loginResponse: LoginResponse) => {
    const userData = {
      id: loginResponse.id,
      email: loginResponse.email,
      roles: loginResponse.roles,
    };
    setUser(userData);
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("token", loginResponse.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
  };

  const isUserEditor = user?.roles.includes("Editor") ?? false;

  return (
    <AuthContext.Provider value={{ user, login, logout, isUserEditor }}>
      {children}
    </AuthContext.Provider>
  );
};
