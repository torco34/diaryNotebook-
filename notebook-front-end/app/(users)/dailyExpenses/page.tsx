"use client";
import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

import { FormEdit } from "@/app/components/form/FormEdit";
import { BaseList } from "@/app/components/shared/BaseList";
import { TotalCard } from "@/app/components/shared/BaseTotalCard";
import { useEditModal } from "@/app/hooks/useEditModal";
import { useExpenses } from "@/app/hooks/useExpenses";

export default function DailyExpenses() {
  const { expenses, totalDay, totalMonth, handleDelete } = useExpenses();
  const { isModalOpen, selectedExpenseId, openModal, closeModal } =
    useEditModal();

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

        <BaseList
          expenses={expenses}
          title="Lista de Gastos"
          showDate={true}
          onEdit={(expense) => expense.id && openModal(expense.id)}
          onDelete={handleDelete}
        />

        {selectedExpenseId && (
          <FormEdit
            expenseId={selectedExpenseId}
            isOpen={isModalOpen}
            onClose={closeModal}
          />
        )}
      </div>
    </main>
  );
}
