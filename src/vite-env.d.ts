/// <reference types="vite/client" />

interface IAuth {
  name: string;
  email: string;
  phone: string;
  type: string;
  isPhoneVerified: boolean;
}

interface IAuthContext {
  isLoading: boolean;
  auth?: IAuth;
  registration: (data: IAuth) => Promise<void>;
  login: (phone: string, password: string) => Promise<void>;
  updateAuth: (auth: IAuth) => void;
  refreshAuth: () => Promise<void>;
  logout: () => void;
}
