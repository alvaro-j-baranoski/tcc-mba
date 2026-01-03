import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

const client = axios.create({
  baseURL: "https://localhost:54356",
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

let unauthorizedCallbackInternal: (() => void) | null = null;
let isUnauthorizedHandlerSet = false;
let isHandlingUnauthorized = false;

// Response interceptor: handle 401 Unauthorized globally
client.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const isRequestFromLogin = error.config.url?.includes("/API/Users/Login");
    if (
      status === 401 &&
      !isRequestFromLogin &&
      !isHandlingUnauthorized &&
      unauthorizedCallbackInternal
    ) {
      // Clear token and redirect to login page
      setAuthToken();
      unauthorizedCallbackInternal();
      
      // Debounce to prevent multiple redirects
      isHandlingUnauthorized = true;
      setTimeout(() => {
        isHandlingUnauthorized = false;
      }, 1000);
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

export function onUnauthorized(callback: () => void) {
  if (!isUnauthorizedHandlerSet) {
    isUnauthorizedHandlerSet = true;
    unauthorizedCallbackInternal = callback;
  }
}

export default client;
