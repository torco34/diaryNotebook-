import { useState } from "react";

// Hook personalizado para manejar la apertura y cierre del modal de edición
export function useEditModal() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState<string | null>(
    null
  );

  // Función para abrir el modal y establecer el ID del gasto seleccionado
  const openModal = (expenseId: string): void => {
    console.log("Abriendo modal para editar gasto con ID:", expenseId);
    setSelectedExpenseId(expenseId);
    setIsModalOpen(true);
  };

  // Función para cerrar el modal y limpiar el ID
  const closeModal = (): void => {
    setIsModalOpen(false);
    setSelectedExpenseId(null);
  };

  // Valores y funciones que devuelve el hook
  return {
    isModalOpen,
    selectedExpenseId,
    openModal,
    closeModal,
  };
}
