"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { User, UserRole } from "@/types";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (nombre: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const STORAGE_KEY = "maracumango-user";

const DEMO_USERS: (User & { password: string })[] = [
  {
    id: "u1",
    nombre: "Admin Maracumango",
    email: "admin@maracumango.com",
    rol: "admin",
    password: "admin123",
  },
  {
    id: "u2",
    nombre: "Laura Vega",
    email: "empleado@maracumango.com",
    rol: "empleado",
    password: "empleado123",
  },
  {
    id: "u3",
    nombre: "Cliente Demo",
    email: "cliente@demo.com",
    rol: "cliente",
    password: "cliente123",
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setUser(JSON.parse(stored) as User);
    } catch {
      /* ignore */
    }
    setIsLoading(false);
  }, []);

  const persist = useCallback((u: User | null) => {
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else localStorage.removeItem(STORAGE_KEY);
    setUser(u);
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const found = DEMO_USERS.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
      if (!found) return false;
      const { password: _, ...userData } = found;
      persist(userData);
      return true;
    },
    [persist]
  );

  const register = useCallback(
    async (nombre: string, email: string, _password: string) => {
      const exists = DEMO_USERS.some(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );
      if (exists) return false;
      const newUser: User = {
        id: `u-${Date.now()}`,
        nombre,
        email,
        rol: "cliente" as UserRole,
      };
      persist(newUser);
      return true;
    },
    [persist]
  );

  const logout = useCallback(() => persist(null), [persist]);

  const value = useMemo(
    () => ({ user, isLoading, login, register, logout }),
    [user, isLoading, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}
