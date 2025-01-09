"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { loginUser, registerUser } from "../servicios/auth";

interface User {
  id: number;
  name: string;
  email: string;
  city?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    city?: string
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser)); // Parsear el JSON
        setToken(storedToken);
      } catch (error) {
        console.error("Error al parsear el usuario almacenado:", error);
        localStorage.removeItem("user"); // Limpia datos inválidos
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = (await loginUser(email, password)) as unknown as {
        user: User;
        token: string;
      };
      const { user: loggedInUser, token: receivedToken } = response;

      setUser(loggedInUser);
      setToken(receivedToken);

      // Guardar en localStorage como JSON
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      localStorage.setItem("token", receivedToken);

      console.log("Inicio de sesión exitoso:", { loggedInUser, receivedToken });
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      throw error;
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    city?: string
  ) => {
    try {
      await registerUser(name, email, password, city);
      setUser({
        id: 1,
        name,
        email,
        city,
      });
      setToken("your-token");

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: 1,
          name,
          email,
          city,
        })
      );
      localStorage.setItem("token", "your-token");
    } catch (error) {
      console.error("Error al registrar:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    console.log("Sesión cerrada");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
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
