"use client";

import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { ExpenseListProps } from "./ts/BaseType";

export const BaseList = ({
  expenses,
  title = "Lista de Gastos",
  showDate = false,
  onEdit,
  onDelete,
}: ExpenseListProps) => {
  if (!expenses.id) {
    console.warn("Gasto sin ID:", expenses); // 👈 Esto ayudará a detectar el problema
  }
  return (
    <div className="bg-blue-950 min-h-screen text-gray-100 p-4">
      {title && (
        <h2 className="text-4xl font-semibold text-center text-orange-400 mb-8">
          {title}
        </h2>
      )}

      <div className="space-y-8">
        {expenses.map((expense) => (
          <div
            key={expense._id}
            className="bg-gradient-to-r from-blue-950 to-blue-800 p-2 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 relative flex justify-between items-center"
          >
            {/* Contenedor de la información del gasto */}
            <div className="flex flex-col space-x-3 text-gray-100">
              <h3 className="text-2xl font-semibold text-orange-400">
                {expense.name}
              </h3>

              {/* Mostrar fecha con formato personalizado */}
              {showDate && (
                <p className="text-sm font-semibold text-gray-300">
                  {/* Mostrar fecha en formato "10 de enero, Lunes" */}
                  {new Date(expense.date).toLocaleDateString("es-ES", {
                    day: "numeric", // Día numérico (10, 20, etc.)
                    month: "long", // Mes completo (enero, febrero, etc.)
                  })}{" "}
                  - {expense.dayOfWeek}{" "}
                  {/* Día de la semana (Lunes, Martes, etc.) */}
                </p>
              )}

              {/* Mostrar el precio */}
              <p className="text-xl font-bold text-gray-200">
                ${expense.price.toFixed(2)}
              </p>
            </div>

            {/* Contenedor de los íconos de editar y eliminar */}
            <div className="absolute top-2 right-4 flex items-center space-x-0">
              {onEdit && (
                <button
                  onClick={() => onEdit(expense)}
                  className="text-gray-200 hover:text-gray-100 font-semibold p-2 rounded-full hover:bg-orange-400 transition duration-300"
                >
                  <FaPencilAlt className="text-1xl" />
                </button>
              )}
              {/* Icono de eliminar */}

              {onDelete && (
                <button
                  onClick={() => onDelete(expense.id!)}
                  className="text-gray-200 hover:text-gray-100 font-semibold p-2 rounded-full hover:bg-red-500 transition duration-300"
                >
                  <FaRegTrashAlt className="text-1xl" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
