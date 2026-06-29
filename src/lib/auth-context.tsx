"use client";

/**
 * AUTH CONTEXT — App-wide login state.
 *
 * On first load it reads the saved token and verifies it against the backend
 * (/auth/me). If the token is valid the user stays logged in across refreshes.
 * If it's missing or expired, the session is cleared.
 *
 * Use the `useAuth()` hook anywhere to read the current user or call
 * login / logout.
 */

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getMe, type User } from "@/lib/api";

const TOKEN_KEY = "token";
const USER_KEY = "user";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Pull the freshest user from the backend using the stored token.
  const refresh = useCallback(async () => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    const result = await getMe();

    if (result.data) {
      setUser(result.data);
      localStorage.setItem(USER_KEY, JSON.stringify(result.data));
    } else {
      // Token invalid or expired — clear the session.
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      setUser(null);
    }

    setIsLoading(false);
  }, []);

  // Verify the session once on mount.
  useEffect(() => {
    void refresh();
  }, [refresh]);

  const login = useCallback((token: string, nextUser: User) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: user !== null,
        login,
        logout,
        refresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
