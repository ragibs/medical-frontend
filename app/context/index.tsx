"use client";
import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import Cookies from "js-cookie";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  role: string;
}

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

const UserContext = createContext<UserContextProps | null>(null);

export const AppWrapper = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = Cookies.get("medappapi_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const clearUser = () => {
    setUser(null);
    Cookies.remove("medappapi_user");
    Cookies.remove("medappapi_access_token");
  };

  return (
    <UserContext.Provider value={{ user, setUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUserContext = () => {
  const context = useContext(UserContext);

  // Ensure context is not undefined
  if (!context) {
    throw new Error("useUserContext must be used within an AppWrapper");
  }

  return context;
};
