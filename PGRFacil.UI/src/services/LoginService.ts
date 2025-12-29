import client, { setAuthToken } from "./client";

export interface LoginUserPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  jwt: string;
}

export const LoginService = {
  loginUser(payload: LoginUserPayload) {
    return client.post<LoginResponse>("/API/Acessos/Login", payload);
  },

  handleSuccess(response: LoginResponse) {
    // Persist token and configure client to use it
    setAuthToken(response.jwt);
  },
};
