import { useState } from "react";

import {
  FaBell,
  FaEllipsisV,
  FaPencilAlt,
  FaRegTrashAlt,
} from "react-icons/fa";

// Definir tipos para las propiedades del componente
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
  customMenuItems?: MenuItem[];
}

const BaseCard: React.FC<BaseCardProps> = ({
  title,
  description,
  time,
  diaSemana,
  onEdit = () => console.log("Editar"),
  onDelete = () => console.log("Eliminar"),
}) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="max-w-sm mx-auto my-4 p-5 bg-white border rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-lg text-gray-700">{title}</h2>
        <div className="relative">
          <button
            onClick={toggleMenu}
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <FaEllipsisV />
          </button>
          {!menuOpen && (
            <div className="absolute right-0 w-40 bg-white border rounded-lg shadow-lg z-10">
              <ul className="py-1">
                <li
                  className="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-100 text-gray-700"
                  onClick={onEdit}
                >
                  <FaPencilAlt className="mr-2" />
                  Editar
                </li>
                <li
                  className="px-4 py-2 flex items-center cursor-pointer hover:bg-red-100 text-red-600"
                  onClick={onDelete}
                >
                  <FaRegTrashAlt className="mr-2" />
                  Eliminar
                </li>
                <li
                  className="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-100 text-gray-700"
                  onClick={() => console.log("Eliminar")}
                >
                  <FaBell className="mr-2" />2 horas antes
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <p className="mt-2 text-gray-600">Dia: {diaSemana}</p>
      <p className="mt-2 text-gray-600">Tema: {description}</p>
      <p className="mt-2 text-gray-600 font-semibold">{time}</p>
    </div>
  );
};

export default BaseCard;
