import { createContext, useState } from "react";
import { ReactNode } from "../interfaces/ReactNode";
import { ApolloCache, ApolloError, FetchResult, gql, MutationFunctionOptions, useMutation } from "@apollo/client";

interface User {
  id: string | null;
  username: string | null;
}

interface Mutation<TData, TVariables, TContext, TCache extends ApolloCache<any>> {
  mutate:
    | ((options?: MutationFunctionOptions<TData, TVariables, TContext, TCache>) => Promise<FetchResult<TData>>)
    | null;
  loading: boolean;
  error: ApolloError | undefined;
}

interface UserContextType<TData, TVariables, TContext, TCache extends ApolloCache<any>> {
  user: User | null;
  register: Mutation<TData, TVariables, TContext, TCache>;
  login: Mutation<TData, TVariables, TContext, TCache>;
  logout: Mutation<TData, TVariables, TContext, TCache>;
}

const UserContextInit = {
  user: null,
  register: {
    mutate: null,
    loading: false,
    error: undefined,
  },
  login: {
    mutate: null,
    loading: false,
    error: undefined,
  },
  logout: {
    mutate: null,
    loading: false,
    error: undefined,
  },
};

export const UserContext = createContext<UserContextType<any, any, any, any>>(UserContextInit);

export const UserProvider = ({ children }: ReactNode) => {
  const [user, setUser] = useState<User | null>(null);

  const [registerMutate, { ...reg }] = useMutation(
    gql`
      mutation RegisterUser($username: String!, $email: String!, $password: String!) {
        data: registerUser(registerUserInput: { username: $username, email: $email, password: $password })
      }
    `,
    {
      onCompleted: () => console.log("User successfully registered"), // FIXME: d
      onError: (err) => console.log("register: ", err),
    }
  );

  const [loginMutate, { ...logi }] = useMutation(
    gql`
      mutation LoginUser($username: String!, $password: String!) {
        data: loginUser(username: $username, password: $password) {
          id
          username
        }
      }
    `,
    {
      onCompleted: (data) => console.log(data),
      onError: (err) => console.log("login: ", err),
    }
  );

  const [logoutMutate, { ...logo }] = useMutation(
    gql`
      mutation {
        data: logoutUser
      }
    `,
    {
      onError: (err) => console.log("logout: ", err),
    }
  );

  const register = { mutate: registerMutate, loading: reg.loading, error: reg.error };
  const login = { mutate: loginMutate, loading: logi.loading, error: logi.error };
  const logout = { mutate: logoutMutate, loading: logo.loading, error: logo.error };

  return <UserContext.Provider value={{ user, register, login, logout }}>{children}</UserContext.Provider>;
};
