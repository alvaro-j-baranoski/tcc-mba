import client, { setAuthToken } from "./client";

export interface LoginUserPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  email: string;
  token: string;
}

export const LoginService = {
  loginUser(payload: LoginUserPayload) {
    return client.post<LoginResponse>("/API/Acessos/Login", payload);
  },

  handleSuccess(response: LoginResponse) {
    // Persist token and configure client to use it
    localStorage.setItem("email", response.email);
    setAuthToken(response.token);
  },

  registerUser(payload: LoginUserPayload) {
    return client.post<LoginResponse>("/API/Acessos/Registrar", payload);
  },

  logout() {
    localStorage.removeItem("email");
    setAuthToken();
  }
};
