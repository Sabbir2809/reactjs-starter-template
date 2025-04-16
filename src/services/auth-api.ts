import { AUTH_BACKEND_BASE_URL } from "../constants";
import { createAPI } from "../lib/apiClient";

const AUTH = createAPI(AUTH_BACKEND_BASE_URL);

const registration = async (body: IAuth) => {
  const response = await AUTH.post<{ token: string }>("/registration", body);
  return response.token;
};

const login = async (body: { phone: string; password: string }) => {
  const response = await AUTH.post<{ token: string }>("/login", body);
  return response.token;
};

const myProfile = async () => {
  const response = await AUTH.get<IAuth>("/my-profile");
  return response;
};

export const AUTH_API = {
  registration,
  login,
  myProfile,
};
