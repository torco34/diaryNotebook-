"use client";

import { useAuth } from "../../context/AuthContext";
import { MenuAvatar } from "./components/MenuAvatar";
import { MenuUser } from "./components/MenuHeader";
import { MenuLogo } from "./components/MenuLogo";
import { MenuPublic } from "./components/MenuPublic";

const Header = () => {
  const { user, logout, login } = useAuth(); // Obtén el estado de autenticación y funciones del contexto

  return (
    <header className="nav bg-slate-100 shadow-lg">
      <div className="container mx-auto flex items-center justify-around p-4">
        <MenuLogo />

        {/* Navegación */}
        <nav className="flex-grow flex justify-end items-center space-x-6">
          {!user ? (
            // Mostrar MenuPublic cuando no hay usuario autenticado
            <MenuPublic
              onLoginClick={() => login("email@example.com", "password")}
            />
          ) : (
            // Mostrar MenuUser y MenuAvatar cuando hay usuario autenticado
            <>
              <MenuUser />
              <MenuAvatar onClick={logout} />
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
