"use client";
import { createContext, useState, ReactNode, useContext } from "react";

// Define the structure of the User object
interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  role: string;
}

// Define the context props interface
interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

// Create the context with a default value of undefined
const UserContext = createContext<UserContextProps | null>(null);

export const AppWrapper = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const clearUser = () => setUser(null);

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
