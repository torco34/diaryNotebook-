// hooks/useAuth.ts
import { useState } from "react";

export const AllHookNav = () => {
  // Estado de autenticación
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Estado del menú
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Funciones para autenticación
  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

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
