"use client";
import { useEffect, useRef, useState } from "react";

import BaseImg from "../../shared/BaseImg";
import { MenuProfile } from "./MenuProfile";

interface CustomMenu {
  onClick?: () => void;
}

export const MenuAvatar = ({ onClick }: CustomMenu) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
      <div className="rounded-full">
        <BaseImg
          src="https://randomuser.me/api/portraits/women/42.jpg"
          alt="Agenda"
          width={50}
          height={50}
          onClick={toggleMenu}
          className=" mx-auto rounded-full cursor-pointer"
        />
      </div>
      {/* Menu that drops down */}
      {isMenuVisible && (
        <div className="absolute right- mt-2  w-48 bg-white  rounded-md shadow-lg">
          <MenuProfile onClick={onClick} />
        </div>
      )}
    </div>
  );
};
