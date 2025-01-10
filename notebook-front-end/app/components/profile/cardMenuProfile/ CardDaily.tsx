import { useState } from "react";

import {
  FaBell,
  FaEllipsisV,
  FaPencilAlt,
  FaRegTrashAlt,
} from "react-icons/fa";

import { BaseButton } from "../../shared/BaseButton";
import MenuDate from "./MenuDate";

interface MenuItem {
  label: string;
  icon: React.ComponentType;
  action: () => void;
}

interface BaseCardProps {
  title: string;
  description: string;
  time: string;
  diaSemana: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onNotification?: () => void;
  customMenuItems?: MenuItem[];
}

export const CardDaily = ({
  title,
  description,
  time,
  diaSemana,
  onEdit,
  onDelete,
  onNotification,
}: BaseCardProps) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const menuItems = [
    {
      label: "Editar",
      icon: FaPencilAlt,
      action: onEdit || (() => console.log("Editar")),
      color: "green",
    },
    {
      label: "Eliminar",
      icon: FaRegTrashAlt,
      action: onDelete || (() => console.log("Eliminar")),
      color: "#F44336",
    },
    {
      label: "2 horas antes",
      icon: FaBell,
      action: onNotification || (() => console.log("Notificación")),
      color: "#FFC107",
    },
  ];

  return (
    <div className="max-w-sm mx-auto my-4 p-5 bg-white border rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-lg text-gray-700">{title}</h2>
        <div className="relative">
          <BaseButton
            label=""
            variant="transparent"
            className="bg-opacity-0 hover:bg-gray-100 hover:bg-opacity-50 transition-colors duration-200"
            onClick={toggleMenu}
            icon={<FaEllipsisV className="w-5 text-orange-500 h-5" />}
          />
          {menuOpen && (
            <MenuDate
              menuItems={menuItems}
              isVisible={menuOpen}
              onClose={() => setMenuOpen(false)}
            />
          )}
        </div>
      </div>
      <p className="mt-2 text-gray-600">
        <strong>Gastos del dia</strong> {diaSemana}
      </p>
      <p className="mt-2 ">
        <strong> </strong>
        {description}
      </p>
      <p> {time}</p>
    </div>
  );
};
