import { createBrowserRouter } from "react-router-dom";
import Auth from "../../pages/Auth";
import Dashboard from "../../components/Dashboard";
import Home from "../../pages/Home";
import Search from "../../pages/Search";
import Playlist from "../../pages/Playlist";
import Settings from "../../pages/Settings";
import Library from "../../pages/Library";
import Account from "../../pages/Account";

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
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "library",
        element: <Library />,
      },
      {
        path: "playlist/:id",
        element: <Playlist />,
      },
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);
