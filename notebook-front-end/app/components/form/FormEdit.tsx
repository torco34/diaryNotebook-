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
  const expenseIdString = (expenseId as any).id ?? expenseId;
  console.log("✅ ID limpio:", expenseIdString);
  // typeof expenseId === "object" ? expenseId.id : expenseId;

  console.log("🔑 ID correcto:", expenseIdString);

  const expense = expenses.find((exp) => exp.id === expenseIdString);
  console.log("Gasto encontrado:", expense);
  const [updatedExpense, setUpdatedExpense] = useState<IExpense | null>(null);
  console.log(expenses, "expense");
  console.log("Gasto encontrado:", expense);
  // Cargar el gasto a editar cuando se abre el modal
  useEffect(() => {
    if (expense) {
      setUpdatedExpense({ ...expense });
    } else {
      console.warn("No se encontró el gasto para editar.");
    }
  }, [expense]);
  // Manejo de cambios en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedExpense((prevExpense) => ({
      ...prevExpense!,
      [name]: value,
    }));
  };

  // Enviar los cambios del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!updatedExpense) {
      console.error("❌ No se encontró un gasto actualizado.");
      toast.error("No se ha proporcionado un gasto válido.");
      return;
    }

    console.log("📤 Enviando actualización:", updatedExpense); // Debug

    await handleEdit(updatedExpense); // Llamar a la función de actualización

    onClose(); // Cerrar modal después de actualizar
  };
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Editar Gasto">
      {loading ? (
        <div>Cargando...</div>
      ) : error ? (
        <div>{error}</div>
      ) : !expense ? (
        <div>Gasto no encontrado</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="id"
              className="block text-sm font-medium text-gray-700"
            >
              ID del Gasto (backend)
            </label>
            <input
              type="text"
              id="id"
              name="id"
              value={updatedExpense?.id || ""} // Asegúrate de que estás usando '_id' para mostrar el ID correcto
              readOnly // Esto hará que el campo sea solo de lectura para que no se pueda editar
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={updatedExpense?.name || ""}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Precio
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={updatedExpense?.price || ""}
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