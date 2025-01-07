"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { loginUser, registerUser } from "../servicios/auth";

interface AuthContextType {
  user: string | null; // Estado del usuario autenticado
  token: string | null; // Token del usuario autenticado
  login: (email: string, password: string) => Promise<void>; // Función para iniciar sesión
  register: (
    name: string,
    email: string,
    password: string,
    city?: string
  ) => Promise<void>; // Función para registrar un nuevo usuario
  logout: () => void; // Función para cerrar sesión
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }
  }, []);

  // const login = async (email: string, password: string) => {
  //   try {
  //     const { user: loggedInUser, token: receivedToken } = await loginUser(
  //       email,
  //       password
  //     );

  //     setUser(loggedInUser);
  //     setToken(receivedToken);

  //     // Guardar en localStorage
  //     localStorage.setItem("user", loggedInUser);
  //     localStorage.setItem("token", receivedToken);

  //     console.log("Inicio de sesión exitoso:", { loggedInUser, receivedToken });
  //   } catch (error) {
  //     console.error("Error al iniciar sesión:", error);
  //     throw error;
  //   }
  // };

  const login = async (email: string, password: string) => {
    try {
      const { user: loggedInUser, token: receivedToken } = await loginUser(
        email,
        password
      );

      setUser(loggedInUser);
      setToken(receivedToken);

      // Guardar en localStorage
      localStorage.setItem("user", loggedInUser);
      localStorage.setItem("token", receivedToken);

      console.log("Inicio de sesión exitoso:", { loggedInUser, receivedToken });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al iniciar sesión:", error.message);
      } else {
        console.error("Error al iniciar sesión:", error);
      }
      alert("Error al iniciar sesión. Intenta nuevamente.");
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
      const { user: registeredUser, token: receivedToken } = await registerUser(
        name,
        email,
        password,
        city
      );

      setUser(registeredUser);
      setToken(receivedToken);

      // Guardar en localStorage
      localStorage.setItem("user", registeredUser);
      localStorage.setItem("token", receivedToken);

      console.log("Registro exitoso:", { registeredUser, receivedToken });
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
