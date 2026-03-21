import type { LoginPayload } from "@/pages/Login/LoginPayload";
import type { LoginResponse } from "@/pages/Login/LoginResponse";
import type { RegisterPayload } from "@/pages/Registrar/RegisterPayload";
import client from "./client";

export const LoginService = {
  loginUser(payload: LoginPayload) {
    return client.post<LoginResponse>("/API/Usuarios/Login", payload);
  },

  registerUser(payload: RegisterPayload) {
    return client.post("/API/Usuarios/Registrar", payload);
  },
};
