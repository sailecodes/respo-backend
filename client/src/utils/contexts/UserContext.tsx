import { createContext, useState } from "react";
import { User } from "../interfaces/User";
import { ReactNode } from "../interfaces/props/ReactNode";

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>> | null;
}

const UserContextInit = {
  user: null,
  setUser: null,
};

export const UserContext = createContext<UserContextType>(UserContextInit);

export const UserProvider = ({ children }: ReactNode) => {
  const [user, setUser] = useState<User | null>(null);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
