import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../pages/Login";
import NotFoundPage from "../pages/NotFound";
import RegistrationPage from "../pages/Registration";
import PrivateRoutes from "./PrivateRoutes";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegistrationPage />,
  },
  {
    path: "/private",
    element: (
      <PrivateRoutes role="">
        <App />
      </PrivateRoutes>
    ),
    children: [],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default routes;
