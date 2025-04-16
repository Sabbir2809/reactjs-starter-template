import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getJWT } from "../utils/JWT";

type TPrivateRoutesProps = {
  children: ReactNode;
  role?: string;
};

const PrivateRoutes = ({ children, role }: TPrivateRoutesProps) => {
  const { logout, auth } = useAuth();
  const token = getJWT();

  // Redirect to login if no token is found
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    // Redirect if the user's role does not match
    if (role && role !== auth?.type) {
      logout();
      return <Navigate to="/login" replace />;
    }
    // Redirect to phone verification if the phone is not verified
    if (!auth?.isPhoneVerified) {
      return <Navigate to="/verify-phone-number" replace />;
    }
    // Render children if authorized
    return <>{children}</>;
  } catch (error) {
    console.error("Token verification failed:", error);
    logout();
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoutes;
