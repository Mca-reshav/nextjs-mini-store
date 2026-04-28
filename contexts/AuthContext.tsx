"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, User } from "@/types/auth";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (storedUser) setUser(JSON.parse(storedUser));
      if (storedToken) setToken(storedToken);
    } catch (e) {
      console.error("Failed to load auth");
    }
  }, []);

  const login = (userData: User) => {
    const dummyToken = "dummy-token-123";

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", dummyToken);

    setUser(userData);
    setToken(dummyToken);
  };

  const register = (userData: User) => {
    login(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("AuthContext not found");
  return ctx;
};