import axios, { AxiosError, AxiosInstance } from "axios";
import { toast } from "react-toastify";
import { JWT_TOKEN_KEY } from "../../constants";
import { getToken, removeToken } from "../../utils/JWT";
import { handleHttpError } from "./errorHandler";

const createAxiosInstance = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use((config) => {
    const token = getToken(JWT_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      const status = error.response?.status;
      const errorData = error.response?.data;
      const message =
        typeof errorData === "object" &&
        errorData !== null &&
        "message" in errorData
          ? (errorData as { message: string }).message
          : error.message;

      if (status === 401) {
        toast.error("Session expired. Redirecting to login...");
        setTimeout(() => {
          removeToken();
          window.location.href = "/login";
        }, 2000);
      }

      if (status) handleHttpError(status, message);

      if (import.meta.env.VITE_ENVIRONMENT === "staging") {
        console.error("[AXIOS ERROR]", {
          status,
          message,
          url: error.config?.url,
          method: error.config?.method,
          data: error.response?.data,
        });
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export default createAxiosInstance;
