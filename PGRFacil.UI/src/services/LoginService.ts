import type { LoginPayload } from "@/models/login/LoginPayload";
import type { LoginResponse } from "@/models/login/LoginResponse";
import type { RegisterPayload } from "@/models/login/RegisterPayload";
import client from "./client";

export const LoginService = {
  loginUser(payload: LoginPayload) {
    return client.post<LoginResponse>("/API/Usuarios/Login", payload);
  },

  registerUser(payload: RegisterPayload) {
    return client.post("/API/Usuarios/Registrar", payload);
  },
};
