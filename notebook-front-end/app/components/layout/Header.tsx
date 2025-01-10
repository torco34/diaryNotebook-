"use client";

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { MenuAvatar } from "./components/MenuAvatar";
import { MenuUser } from "./components/MenuHeader";
import { MenuLogo } from "./components/MenuLogo";
import { MenuPublic } from "./components/MenuPublic";

const Header = () => {
  const { user, logout, login } = useAuth(); // Estado de autenticación y funciones del contexto
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para el menú responsive

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <header className="bg-slate-100 shadow-lg">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <MenuLogo />

        {/* Botón de menú para pantallas pequeñas */}
        <button
          onClick={toggleMenu}
          className="block md:hidden p-2 border rounded-lg hover:bg-gray-200"
          aria-label="Abrir menú"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>

        {/* Navegación */}
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex flex-col md:flex-row md:items-center md:space-x-6 absolute md:static top-16 left-0 w-full md:w-auto bg-slate-100 md:bg-transparent p-4 md:p-0 shadow-lg md:shadow-none`}
        >
          {!user ? (
            // Mostrar MenuPublic cuando no hay usuario autenticado
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <MenuPublic
                onLoginClick={() => login("email@example.com", "password")}
              />
            </div>
          ) : (
            // Mostrar MenuUser y MenuAvatar cuando hay usuario autenticado
            <div className="flex flex-col md:flex-row items-start  md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <MenuUser />
              <MenuAvatar onClick={logout} />
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
