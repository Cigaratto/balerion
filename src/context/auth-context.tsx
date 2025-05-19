"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

type Role = "ADMIN" | "USER" | null;

type AuthData = {
  email: string | null;
  role: Role;
  isLoading: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthData | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState<string | null>(null);
  const [role, setRole] = useState<Role>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedRole = localStorage.getItem("role") as Role;

    if (storedEmail && storedRole) {
      setEmail(storedEmail);
      setRole(storedRole);
      router.push("/");
    } else {
      router.push("/auth/login");
    }
    setIsLoading(false);
  }, [router]);

  const login = (username: string, password: string) => {
    const credentials: Record<string, { token: string }> = {
      user1: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidXNlcjEiLCJlbWFpbCI6InVzZXIuZW1haWxAZ21haWwuY29tIiwicm9sZSI6IlVTRVIifQ.IgQln56kjBGc66IAjRMjeJtscM2u--Uz5Ul01r1f874",
      },
      admin1: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4xIiwiZW1haWwiOiJhZG1pbi5lbWFpbEBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4ifQ.91VaQcMDdRWOj849ddLZO7pR_qjl_DpHdaaYCYfakkg",
      },
    };

    const user = credentials[username];
    if (!user || password !== "1234") {
      alert("Incorrect username or password");
      return;
    }

    const { email, role } = jwtDecode<{ email: string; role: Role }>(user.token);
    setEmail(email);
    setRole(role);

    localStorage.setItem("email", email);
    localStorage.setItem("role", role!);
    router.push("/");
  };

  const logout = () => {
    setEmail(null);
    setRole(null);
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ email, role, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an <AuthProvider>");
  return context;
}
