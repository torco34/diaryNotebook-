"use client";
import { useState } from "react";

import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

import { FormEdit } from "@/app/components/form/FormEdit";
import { BaseList } from "@/app/components/shared/BaseList";
import { TotalCard } from "@/app/components/shared/BaseTotalCard";
import { useExpenses } from "@/app/hooks/useExpenses";

export default function DailyExpenses() {
  const { expenses, totalDay, totalMonth, handleDelete } = useExpenses();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState<string | null>(
    null
  );

  const openEditModal = (expenseId: string) => {
    console.log("Abriendo modal para editar gasto con ID:", expenseId);
    setSelectedExpenseId(expenseId); // Solo guardar el ID, no el objeto completo
    setIsModalOpen(true);
  };

  return (
    <main className="grid min-h-screen justify-items-center p-4 bg-blue-950">
      <div className="max-w-7xl w-full mx-auto p-6">
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

        <Link href="/dashboard">
          <button className="flex items-center mb-4 px-6 py-2 bg-blue-950 text-orange-400 rounded-md hover:bg-blue-900 hover:text-yellow-400 transition-all duration-200">
            <PlusIcon className="w-5 h-5 mr-2" />
            Agregar Gasto
          </button>
        </Link>
        {/* 
        <BaseList
          expenses={expenses}
          title="Lista de Gastos"
          showDate={true}
          onEdit={openEditModal}
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
    </main>
  );
}
