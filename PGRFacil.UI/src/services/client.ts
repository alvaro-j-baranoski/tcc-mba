import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import { toast } from "sonner";

const client = axios.create({
  baseURL: "https://localhost:51957",
  timeout: 1000,
  headers: {
    Accept: "text/plain",
    "Content-Type": "application/json",
  },
});

// Automatically attach the JWT from localStorage to every request
client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: handle 401 Unauthorized globally
client.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      const isRequestFromLogin =
        error.config.url?.includes("/API/Acessos/Login");
      if (!isRequestFromLogin) {
        // Clear token and redirect to login page
        setAuthToken();
        window.location.href = "/login";
        toast.error("Sessão expirada. Por favor, faça login novamente.");
      }
    }

    return Promise.reject(error);
  }
);

// Helper to set/clear the token programmatically (also persists to localStorage)
export function setAuthToken(token?: string) {
  if (token) {
    localStorage.setItem("jwt", token);
  } else {
    localStorage.removeItem("jwt");
  }
}

export default client;
