"use client";
import { TotalCard } from "@/app/components/shared/BaseTotalCard";
import { BaseList } from "../../components/shared/BaseList";
import { useExpenses } from "../../hooks/useExpence";

export default function SuperProp() {
  const { expenses, totalDay, totalMonth, handleDelete, handleEdit } =
    useExpenses();
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
      <BaseList
        expenses={expenses}
        title="Lista de Gastos"
        showDate={true}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
