import Cookies from "js-cookie";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AUTH_USER_KEY, JWT_TOKEN_KEY, USER_TYPE } from "../constants";
import { AUTH_API } from "../services/auth-api";
import { AuthContext } from "./auth-context";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [auth, setAuth] = useState<IAuth>();

  // registration
  const registration = async (data: IAuth) => {
    try {
      setIsLoading(true);
      const token = await AUTH_API.registration(data);
      if (token) {
        Cookies.set(JWT_TOKEN_KEY, token);
        await refreshAuth();
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Registration Error:", error);
      toast.error("Registration failed.");
    } finally {
      setIsLoading(false);
    }
  };

  // login
  const login = async (phone: string, password: string) => {
    try {
      setIsLoading(true);
      const token = await AUTH_API.login({ phone, password });
      if (token) {
        Cookies.set(JWT_TOKEN_KEY, token);
        await refreshAuth();
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Login failed.");
    } finally {
      setIsLoading(false);
    }
  };

  // updateAuth
  const updateAuth = (newAuth: IAuth) => {
    setAuth(newAuth);
    Cookies.set(AUTH_USER_KEY, JSON.stringify(newAuth));
  };

  // refreshAuth
  const refreshAuth = async () => {
    setIsLoading(true);
    try {
      const data = await AUTH_API.myProfile();
      if (data && data.type.includes(USER_TYPE)) {
        setAuth(data);
        Cookies.set(AUTH_USER_KEY, JSON.stringify(data));
      } else {
        toast.error("Invalid user type.");
      }
    } catch (error) {
      console.error("Refresh Error:", error);
      toast.error("Failed to refresh user.");
    } finally {
      setIsLoading(false);
    }
  };

  // logout
  const logout = () => {
    setAuth(undefined);
    Cookies.remove(AUTH_USER_KEY);
    Cookies.remove(JWT_TOKEN_KEY);
    window.location.href = "/";
  };

  useEffect(() => {
    const storedUser = Cookies.get(AUTH_USER_KEY);
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser as string) as IAuth;
        setAuth(parsedUser);
      } catch {
        Cookies.remove(AUTH_USER_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        auth,
        registration,
        login,
        updateAuth,
        refreshAuth,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
