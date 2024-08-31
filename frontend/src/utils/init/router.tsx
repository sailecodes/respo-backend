import { createBrowserRouter } from "react-router-dom";
import Auth from "../../pages/Auth";
import Dashboard from "../../pages/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);
