"use client";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import BaseImg from "../../shared/BaseImg";
import { MenuProfile } from "./MenuProfile";

interface CustomMenu {
  onClick?: () => void;
}

export const MenuAvatar = ({ onClick }: CustomMenu) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  console.log(user?.name, "avata");
  const toggleMenu = () => {
    setIsMenuVisible((prev) => !prev);
  };

  // Detectar clics fuera del menú
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative inline-block">
      <div className="  w-max flex items-center">
        <span className="text-sm flex  mx-9 font-bold text-blue-950">
          {user ? user.name : "Usuario"}
        </span>

        <BaseImg
          src="https://randomuser.me/api/portraits/women/42.jpg"
          alt="Agenda"
          width={50}
          height={50}
          onClick={toggleMenu}
          className=" mx-auto rounded-full cursor-pointer"
        />
      </div>

      {isMenuVisible && (
        <div className="absolute mx-10 mt-4   w-10/11 bg-white  rounded-md shadow-lg">
          <MenuProfile onClick={onClick} />
        </div>
      )}
    </div>
  );
};
