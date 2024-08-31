import { ApolloProvider } from "@apollo/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./utils/init/router";
import { apolloClient } from "./utils/init/apolloClient";
import { UserProvider } from "./utils/contexts/UserContext";

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </ApolloProvider>
  );
}

export default App;
