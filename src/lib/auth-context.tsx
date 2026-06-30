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
  updateUser: (user: User) => void;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * Resolve the current user from the stored token without touching React state.
 * Returns the user if the token is valid, otherwise clears it and returns null.
 */
async function resolveSession(): Promise<User | null> {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return null;

  const result = await getMe();

  if (result.data) {
    localStorage.setItem(USER_KEY, JSON.stringify(result.data));
    return result.data;
  }

  // Token invalid or expired — clear the session.
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  return null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verify the session once on mount. State is only set inside the promise
  // callback, never synchronously, so we avoid cascading renders.
  useEffect(() => {
    let active = true;
    resolveSession().then((resolved) => {
      if (!active) return;
      setUser(resolved);
      setIsLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  // Re-pull the user from the backend (e.g. after a role change).
  const refresh = useCallback(async () => {
    const resolved = await resolveSession();
    setUser(resolved);
  }, []);

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

  // Update the cached user after a profile change (no extra network call).
  const updateUser = useCallback((nextUser: User) => {
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: user !== null,
        login,
        logout,
        updateUser,
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
