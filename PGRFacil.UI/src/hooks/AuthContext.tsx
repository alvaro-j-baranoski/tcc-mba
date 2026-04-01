// AuthContext.jsx
import type { LoginResponse } from '@/pages/Login/LoginResponse';
import type { Usuario } from '@/pages/Usuarios/models/Usuario';
import { createContext } from 'react';

// Define the context type
export interface AuthContextType {
  user: Usuario | null;
  login: (loginResponse: LoginResponse) => void;
  logout: () => void;
  isUserEditor: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
