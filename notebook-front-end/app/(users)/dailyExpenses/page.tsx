"use client";
import { BaseList } from "@/app/components/shared/BaseList";
import { TotalCard } from "@/app/components/shared/BaseTotalCard";
import { useExpenses } from "@/app/hooks/useExpence";

import { PlusIcon } from "@heroicons/react/24/solid"; // Icono de + de Heroicons
import Link from "next/link";

export default function DailyExpenses() {
  const { expenses, totalDay, totalMonth, handleDelete, handleEdit } =
    useExpenses();

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

        <button className="flex items-center mb-4 px-6 py-2 bg-blue-950 text-orange-400 rounded-md hover:bg-blue-900 hover:text-yellow-400 transition-all duration-200">
          <PlusIcon className="w-5 h-5 mr-2" />
          <Link href="/dashboard">Agregar Gasto</Link>
        </button>

        <div>
          <BaseList
            expenses={expenses}
            title="Lista de Gastos"
            showDate={true}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </main>
  );
}
