import { useState } from "react";

import {
  FaBell,
  FaCalendarAlt,
  FaEllipsisV,
  FaPen,
  FaRegClock,
  FaTrash,
} from "react-icons/fa";

import { BaseButton } from "../../shared/BaseButton";
import MenuDate from "./MenuDate";

interface MenuItem {
  label: string;
  color: string;
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

export default function CardDate({
  title,
  description,
  time,
  diaSemana,
  onEdit,
  onDelete,
  onNotification,
  customMenuItems = [],
}: BaseCardProps) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // Crear menuItems dinámicamente
  const menuItems: MenuItem[] = [
    ...(onEdit
      ? [{ label: "Editar", icon: FaPen, action: onEdit, color: "black" }]
      : []),
    ...(onDelete
      ? [{ label: "Eliminar", icon: FaTrash, action: onDelete, color: "red" }]
      : []),
    ...(onNotification
      ? [
          {
            label: "Notificar",
            icon: FaBell,
            action: onNotification,
            color: "black",
          },
        ]
      : []),
    ...customMenuItems,
  ];

  return (
    <div className="max-w-sm mx-auto my-4 p-5 bg-slate-100 border rounded-lg shadow-md relative">
      <div className="flex justify-between items-center">
        <strong className="text-lg text-blue-900">{title}</strong>
        <div className="relative">
          <BaseButton
            label=""
            variant="transparent"
            className="bg-opacity-0 hover:bg"
            onClick={toggleMenu}
            icon={<FaEllipsisV className="w-5 text-orange-500 h-5" />}
          />
          {menuOpen && (
            <div
              className="absolute right-0 mt-2 z-50 bg-white shadow-md rounded-md border"
              style={{
                minWidth: "150px", // Asegurando un tamaño mínimo para el menú
              }}
            >
              <MenuDate
                menuItems={menuItems}
                isVisible={menuOpen}
                onClose={() => setMenuOpen(false)}
              />
            </div>
          )}
        </div>
      </div>
      <p className="mt-2 text-gray-600 flex items-center">
        <FaCalendarAlt className="mr-2 text-orange-500" />
        <strong className="text-blue-950">Dia:</strong> {diaSemana}
      </p>
      <p className="mt-2 text-gray-600">
        <strong className="text-blue-950">Tema:</strong> {description}
      </p>
      <p className="mt-2 text-blue-950 font-semibold flex items-center">
        <FaRegClock className="mr-2 text-orange-500" />
        {time}
      </p>
    </div>
  );
}
