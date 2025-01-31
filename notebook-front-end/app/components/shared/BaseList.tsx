"use client";

import React from "react";

// Definición de la interfaz IExpense
interface IExpense {
  _id: string;
  name: string;
  price: number;
  date: string;
  dayOfWeek: string;
}

// Props para el componente ExpenseList
interface ExpenseListProps {
  expenses: IExpense[];
  title?: string; // Título opcional
  showDate?: boolean; // Controla si se muestra la fecha o no
  onEdit?: (expense: IExpense) => void; // Callback para editar
  onDelete?: (id: string) => void; // Callback para eliminar
}

const ExpenseList: React.FC<ExpenseListProps> = ({
  expenses,
  title = "Lista de Gastos",
  showDate = false,
  onEdit,
  onDelete,
}) => {
  return (
    <div>
      {title && (
        <h2 className="text-3xl font-semibold text-center mb-6 underline decoration-orange-400">
          {title}
        </h2>
      )}
      <div className="space-y-6">
        {expenses.map((expense) => (
          <div
            key={expense._id}
            className="bg-gray-100 p-4 rounded-lg shadow-lg flex justify-between items-center"
          >
            <div>
              <h3 className="text-xl font-semibold text-blue-950">
                {expense.name}
              </h3>
              {showDate && (
                <p className="text-gray-500">
                  {new Date(expense.date).toLocaleDateString()} -{" "}
                  {expense.dayOfWeek}
                </p>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-xl font-semibold text-orange-400">
                ${expense.price.toFixed(2)}
              </p>
              {/* Botón para editar */}
              {onEdit && (
                <button
                  onClick={() => onEdit(expense)}
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Editar
                </button>
              )}
              {/* Botón para eliminar */}
              {onDelete && (
                <button
                  onClick={() => onDelete(expense._id)}
                  className="text-red-600 hover:text-red-800 font-semibold"
                >
                  Eliminar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
