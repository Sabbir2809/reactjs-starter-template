import { useContext } from "react";
import { AuthContext } from "../contexts/auth-context";

// custom hooks
export const useAuth = () => useContext(AuthContext);
