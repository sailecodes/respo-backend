import "react-toastify/dist/ReactToastify.css";
import { ApolloProvider } from "@apollo/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./utils/init/router";
import { apolloClient } from "./utils/init/apolloClient";
import { UserProvider } from "./utils/contexts/UserContext";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <UserProvider>
        <RouterProvider router={router} />
        <ToastContainer stacked hideProgressBar theme="dark" />
      </UserProvider>
    </ApolloProvider>
  );
}

export default App;
