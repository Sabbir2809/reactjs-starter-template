import { createContext } from "react";

export const initialState: IAuthContext = {
  isLoading: true,
  auth: undefined,
  registration: async () => {},
  login: async () => {},
  updateAuth: () => {},
  refreshAuth: async () => {},
  logout: () => {},
};

export const AuthContext = createContext<IAuthContext>(initialState);
