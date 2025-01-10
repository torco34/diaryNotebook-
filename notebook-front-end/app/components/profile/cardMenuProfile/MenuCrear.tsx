"use client";

import { useState } from "react";
import {
  FaAngleDown,
  FaCalendarCheck,
  FaCreditCard,
  FaShoppingCart,
  FaStore,
} from "react-icons/fa";
import { BaseButton } from "../../shared/BaseButton";
import { BaseMenu } from "../../shared/BaseMenu";
const links = [
  { label: "Gastos Diarios", href: "/dashboard", icon: <FaStore /> },
  { label: "Compras hacer", href: "/Shopping", icon: <FaShoppingCart /> },
  { label: "Recordatorios", href: "/specialDates", icon: <FaCalendarCheck /> },
  { label: "Supermercados ", href: "/dailyExpenses", icon: <FaCreditCard /> },
];
export const MenuCrear = () => {
  const [isShowMenu, setIsShowMenu] = useState(false);

  const handleShow = () => {
    setIsShowMenu((prev) => !prev);
  };

  return (
    <div>
      <BaseButton
        label="Crear"
        variant="secondary"
        className="mt-6 flex text-orange-400 bg-blue-900  gap-2"
        onClick={handleShow}
        icon={<FaAngleDown className="w-5 text-orange-400 h-5" />}
      />
      {isShowMenu && (
        <>
          <BaseMenu links={links} />
        </>
      )}
    </div>
  );
};
