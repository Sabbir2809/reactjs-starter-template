import Cookies from "js-cookie";
const JWT_TOKEN = import.meta.env.VITE_JWT_TOKEN_KEY || "_token";
const REFRESH_TOKEN = import.meta.env.VITE_REFRESH_TOKEN || "refresh_token";

export function getJWTToken(): string {
  return Cookies.get(JWT_TOKEN) ?? "";
}

// getAuthorizationHeader
export function getAuthorizationHeader() {
  const token = getJWTToken();
  return {
    Authorization: `Bearer ${token}`,
  };
}

export function getRefreshToken(): string {
  return Cookies.get(REFRESH_TOKEN) ?? "";
}
