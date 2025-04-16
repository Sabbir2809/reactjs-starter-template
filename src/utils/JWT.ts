import Cookies from "js-cookie";
import { JWT_TOKEN_KEY } from "../constants";

export function getJWT() {
  return Cookies.get(JWT_TOKEN_KEY);
}
