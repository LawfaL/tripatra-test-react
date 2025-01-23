import api from "@/lib/axios";
import { createContext, ReactNode, useContext } from "react";
import { useToast } from "./use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  verified: boolean;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  login: (data: Pick<User, "email" | "password">) => void;
  getProfile: () => User;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();

  const login = async (data: Pick<User, "email" | "password">) => {
    try {
      const response = await api.post("/login", data, {
        withCredentials: true,
      });
      if (response.data) {
        const { refresh_token, profile } = (response.data as any).data;
        localStorage.setItem("profile", JSON.stringify(profile));
        localStorage.setItem("refresh_token", refresh_token.Token);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Failed to login!",
        description: "Invalid credentials or network issue",
      });
    }
  };

  const getProfile = () => {
    return localStorage.getItem("profile")
      ? JSON.parse(localStorage.getItem("profile") as string)
      : null;
  };

  return (
    <AuthContext.Provider value={{ login, getProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}; 
