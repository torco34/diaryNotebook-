import React, { useEffect, useState } from "react";

import { IExpense, useExpenses } from "../../hooks/useExpenses";
import { BaseModal } from "../shared/BaseModal";

interface EditExpenseProps {
  expenseId: string;
  isOpen: boolean;
  onClose: () => void;
}

const EditExpenseForm: React.FC<EditExpenseProps> = ({
  expenseId,
  isOpen,
  onClose,
}) => {
  const { expenses, handleEdit } = useExpenses();
  const [updatedExpense, setUpdatedExpense] = useState<IExpense | null>(null);

  useEffect(() => {
    const expense = expenses.find((exp) => exp._id === expenseId);
    if (expense) {
      setUpdatedExpense(expense);
    }
  }, [expenseId, expenses]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (updatedExpense) {
      setUpdatedExpense({
        ...updatedExpense,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (updatedExpense) {
      await handleEdit(updatedExpense);
      onClose(); // Cerrar el modal después de editar
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Editar Gasto">
      {!updatedExpense ? (
        <div>Cargando...</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              name="name"
              value={updatedExpense.name || ""}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Precio
            </label>
            <input
              type="number"
              name="price"
              value={updatedExpense.price || ""}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Guardar
            </button>
          </div>
        </form>
      )}
    </BaseModal>
  );
};

export default EditExpenseForm;
