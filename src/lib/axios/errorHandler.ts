import { toast } from "react-toastify";

export const handleHttpError = (status: number, message?: string) => {
  const defaultMsg = message || "An unexpected error occurred.";

  switch (status) {
    case 400:
      toast.error("Bad Request: Please check your input.");
      break;
    case 401:
      toast.error("Unauthorized: Please login.");
      break;
    case 403:
      toast.error("Forbidden: You do not have permission.");
      break;
    case 404:
      toast.error("Not Found: The requested resource doesn't exist.");
      break;
    case 405:
      toast.error("Method Not Allowed.");
      break;
    case 500:
      toast.error("Internal Server Error.");
      break;
    case 501:
    case 502:
    case 503:
    case 504:
      toast.error("Server temporarily unavailable. Try again later.");
      break;
    default:
      toast.error(defaultMsg);
  }
};
