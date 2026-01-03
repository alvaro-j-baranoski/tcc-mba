import type { LoginPayload } from "@/models/login/LoginPayload";
import type { LoginResponse } from "@/models/login/LoginResponse";
import client from "./client";

export const LoginService = {
  loginUser(payload: LoginPayload) {
    return client.post<LoginResponse>("/API/Users/Login", payload);
  },

  registerUser(payload: LoginPayload) {
    return client.post<LoginResponse>("/API/Users/Register", payload);
  },
};
