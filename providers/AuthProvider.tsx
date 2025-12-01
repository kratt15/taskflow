"use client";

import { useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/contexts/AuthContext";
import * as authService from "@/lib/api/auth";
import { getToken, removeToken } from "@/lib/auth/token";
import { LoginDto, RegisterDto, UserResponseDto } from "@/types/user";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserResponseDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const initAuth = async () => {
      const token = getToken();
      if (token) {
        try {
          const userData = await authService.getCurrentUser();
          setUser(userData);
        } catch (error) {
          console.error(
            "Erreur lors de la récupération de l'utilisateur:",
            error
          );
          removeToken();
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginDto) => {
    try {
      const { user } = await authService.login(credentials);
      setUser(user);
      router.push("/"); // Redirection après connexion
    } catch (error) {
      throw error;
    }
  };

  const register = async (data: RegisterDto) => {
    try {
      const { user } = await authService.register(data);
      setUser(user);
      router.push("/"); // Redirection après inscription
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
