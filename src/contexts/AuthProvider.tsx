import Cookies from "js-cookie";
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { JWT_TOKEN_KEY } from "../constants";
import { AUTH_API } from "../services/auth-api";
import { AuthContext } from "./auth-context";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<IAuth | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // registration
  const registration = async (data: IAuth) => {
    try {
      setIsLoading(true);
      const token = await AUTH_API.registration(data);
      Cookies.set(JWT_TOKEN_KEY, token);
      toast.success("Registration successful");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  // login
  const login = async (data: ILoginPayload) => {
    try {
      setIsLoading(true);
      const token = await AUTH_API.login(data);
      Cookies.set(JWT_TOKEN_KEY, token);
      const user = await AUTH_API.myProfile();
      setAuth(user);
      toast.success("Login successful");
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed, please try again");
    } finally {
      setIsLoading(false);
    }
  };

  // logout
  const logout = () => {
    setAuth(undefined);
    Cookies.remove(JWT_TOKEN_KEY);
    toast.info("Logged out");
    navigate("/", { replace: true });
  };

  // refresh token
  const refreshToken = async () => {
    try {
      const token = await AUTH_API.refreshAuth();
      Cookies.set(JWT_TOKEN_KEY, token);
      const user = await AUTH_API.myProfile();
      setAuth(user);
    } catch (error) {
      console.error("Refresh token failed:", error);
      logout();
    }
  };

  // hydrate token on first load
  useEffect(() => {
    const token = Cookies.get(JWT_TOKEN_KEY);
    if (token) {
      refreshToken().finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  // Context value
  const contextValue = {
    isLoading,
    auth,
    registration,
    login,
    logout,
    refreshToken,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {isLoading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
