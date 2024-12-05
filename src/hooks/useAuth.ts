import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

// custom hooks
export const useAuth = () => useContext(AuthContext);
