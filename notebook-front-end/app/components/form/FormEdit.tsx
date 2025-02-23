import React, { useEffect, useState } from "react";

import toast from "react-hot-toast";

import { useExpenses } from "../../hooks/useExpenses";
import { IExpense } from "../../servicios/serviceExpeses";
import { BaseModal } from "../shared/BaseModal";

interface EditExpenseProps {
  expenseId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const FormEdit: React.FC<EditExpenseProps> = ({
  expenseId,
  isOpen,
  onClose,
}) => {
  const { expenses, loading, error, handleEdit } = useExpenses();
  const [updatedExpense, setUpdatedExpense] = useState<IExpense | null>(null);

  // Cargar el gasto a editar cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      const expense = expenses.find((exp) => exp.id === expenseId);
      setUpdatedExpense(expense ?? null);
    }
  }, [expenseId, isOpen, expenses]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedExpense((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  // Enviar los cambios del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!updatedExpense) {
      toast.error("❌ No se encontró un gasto válido para actualizar.");
      return;
    }

    try {
      await handleEdit(updatedExpense);
      toast.success("✅ Gasto actualizado con éxito. por favor");
      onClose();
    } catch {
      toast.error("⚠️ Hubo un error al actualizar el gasto.");
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Editar Gasto">
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>{error}</p>
      ) : !updatedExpense ? (
        <p>Gasto no encontrado</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-100"
            >
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={updatedExpense.name}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-100"
            >
              Precio
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={updatedExpense.price}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border-gray-100 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
              min={0}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-600 rounded-md"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-700 text-white rounded-md"
            >
              Guardar
            </button>
          </div>
        </form>
      )}
    </BaseModal>
  );
};
