"use client";
import { FormEdit } from "@/app/components/form/FormEdit";
import { TotalCard } from "@/app/components/shared/BaseTotalCard";
import { useState } from "react";
import { BaseList } from "../../components/shared/BaseList";
import { useExpenses } from "../../hooks/useExpenses";

export default function SuperProp() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { expenses, totalDay, totalMonth, handleDelete, handleEdit } =
    useExpenses();
  const [selectedExpenseId, setSelectedExpenseId] = useState<string | null>(
    null
  );
  const openEditModal = (expenseId: string) => {
    console.log("Abriendo modal para editar gasto con ID:", expenseId);
    setSelectedExpenseId(expenseId); // Solo guardar el ID, no el objeto completo
    setIsModalOpen(true);
  };
  return (
    <div className="bg-blue-950 min-h-screen text-gray-100 p-10">
      <div className="flex justify-between items-center mb-8">
        <TotalCard
          title="Suma total del día"
          value={totalDay}
          gradient="bg-gradient-to-r from-orange-400 to-yellow-400"
        />
        <TotalCard
          title="Suma total del mes"
          value={totalMonth}
          gradient="bg-gradient-to-r from-orange-400 to-yellow-400 ml-6"
        />
      </div>
      {/* <BaseList
        expenses={expenses}
        title="Lista de Gastos"
        showDate={true}
        onEdit={handleEdit}
        onDelete={handleDelete}
      /> */}
      <BaseList
        expenses={expenses}
        title="Lista de Gastos"
        showDate={true}
        onEdit={(expenseId) => openEditModal(expenseId)}
        onDelete={handleDelete}
      />
      {selectedExpenseId && (
        <FormEdit
          expenseId={selectedExpenseId}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
