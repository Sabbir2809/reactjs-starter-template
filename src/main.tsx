import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./index.css";
import TanStackQueryProvider from "./lib/TanStackQueryProvider.tsx";
import routes from "./routes/routes.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TanStackQueryProvider>
      <RouterProvider router={routes} />
    </TanStackQueryProvider>
    <ToastContainer />
  </StrictMode>
);
