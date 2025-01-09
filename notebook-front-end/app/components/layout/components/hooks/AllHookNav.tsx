import { useState } from "react";

export const AllHookNav = () => {
  // Estado de autenticación
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Estado del menú
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Función para iniciar sesión
  const login = () => {
    setIsAuthenticated(true);
    console.log("Usuario autenticado");
  };

  // Función para cerrar sesión
  const logout = () => {
    setIsAuthenticated(false);
    console.log("Usuario desconectado");
  };

  // Funciones para el menú
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return {
    isAuthenticated,
    isMenuOpen,
    login,
    logout,
    toggleMenu,
    closeMenu,
  };
};
