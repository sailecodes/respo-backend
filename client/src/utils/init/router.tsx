import { createBrowserRouter } from "react-router-dom";
import Auth from "../../pages/Auth";
import Dashboard from "../../components/Dashboard";
import Home from "../../pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);
