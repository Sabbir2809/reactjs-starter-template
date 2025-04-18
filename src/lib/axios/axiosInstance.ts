import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import { toast } from "react-toastify";
import { JWT_TOKEN_KEY } from "../../constants";
import { getToken } from "../../utils/JWT";

// Create Axios instance with baseURL
const createAxiosInstance = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // 🔐 Attach JWT token to requests
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken(JWT_TOKEN_KEY);
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => {
      console.error("[Request-Error]:", error.message);
      return Promise.reject(error);
    }
  );

  // ⚠️ Centralized error handler for API responses
  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      const { response, request } = error;
      let errorMessage = "Something went wrong!";

      if (response) {
        const { status, data } = response;
        const serverMessage = (data as { message?: string })?.message;

        switch (status) {
          case 400:
            errorMessage =
              serverMessage || `Bad Request (${status}): Invalid request.`;
            break;
          case 401:
            errorMessage =
              serverMessage || `Unauthorized (${status}): Please log in again.`;
            break;
          case 403:
            errorMessage =
              serverMessage || `Forbidden (${status}): Access denied.`;
            break;
          case 404:
            errorMessage =
              serverMessage || `Not Found (${status}): Resource not found.`;
            break;
          case 500:
            errorMessage =
              serverMessage ||
              `Internal Server Error (${status}): Try again later.`;
            break;
          default:
            errorMessage =
              serverMessage || `Error (${status}): Unexpected issue occurred.`;
        }
      } else if (request) {
        errorMessage = "Network error! Please check your internet connection.";
      }

      toast.error(errorMessage);
      return Promise.reject(error);
    }
  );

  return instance;
};

export default createAxiosInstance;
