"use client";
import Link from "next/link";

import { AllHookNav } from "./components/hooks/AllHookNav";
import { MenuAvatar } from "./components/MenuAvatar";
import { MenuUser } from "./components/MenuHeader";
import { MenuLogo } from "./components/MenuLogo";
const Header = () => {
  const { isAuthenticated, isMenuOpen, logout, toggleMenu, login } =
    AllHookNav();

  return (
    <header className="nav bg-slate-100 shadow-lg">
      <div className="container mx-auto flex items-center justify-between p-4">
        <MenuLogo />
        {/* boton de resposive */}
        <button
          onClick={toggleMenu}
          className="block md:hidden p-2 border rounded-lg hover:bg-gray-200"
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

        {/* Header links */}
        <nav
          className={`flex-grow md:flex md:justify-end md:space-x-6 ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          {!isAuthenticated && (
            <div className="flex items-center space-x-4">
              <span className="text-lg top-10 font-bold text-blue-950">
                ¿No tienes cuenta?
              </span>
              <Link
                href="/viewAuth"
                className="hover:text-gray-600 font-bold text-sm"
              >
                <button
                  onClick={login}
                  className="bg-orange-600 font-semibold text-slate-100 px-4 py-2 rounded-lg hover:bg-yellow-300 transition"
                >
                  Iniciar sesión
                </button>
              </Link>
            </div>
          )}
          {isAuthenticated && (
            <div className="flex  items-center space-x-5">
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
