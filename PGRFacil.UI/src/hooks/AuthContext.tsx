// AuthContext.jsx
import type { LoginResponse } from '@/models/login/LoginResponse';
import type { User } from '@/models/users/User';
import { createContext } from 'react';

// Define the context type
export interface AuthContextType {
  user: User | null;
  login: (loginResponse: LoginResponse) => void;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
