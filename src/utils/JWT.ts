import Cookies from "js-cookie";
import { JWT_TOKEN_KEY } from "../constants";

export const getToken = (tokenKey: string): string | null => {
  return Cookies.get(tokenKey) || localStorage.getItem(tokenKey);
};

export const setToken = (tokenKey: string, token: string) => {
  Cookies.set(tokenKey, token, { expires: 7 });
  localStorage.setItem(tokenKey, token);
};

export const removeToken = () => {
  Cookies.remove(JWT_TOKEN_KEY);
  localStorage.removeItem(JWT_TOKEN_KEY);
};
