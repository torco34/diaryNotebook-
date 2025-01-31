"use client";

import { TotalCard } from "@/app/components/shared/BaseTotalCard";
import { useEffect, useState } from "react";
import { BaseList } from "../../components/shared/BaseList";
import { getAllExpenses } from "../../servicios/serviceExpeses";

// Define la interfaz IExpense
interface IExpense {
  _id: string;
  name: string;
  price: number;
  date: string; // La fecha vendrá como string ISO 8601 desde MongoDB
  dayOfWeek: string;
}

export default function SuperProp() {
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const [totalDay, setTotalDay] = useState<number>(0);
  const [totalMonth, setTotalMonth] = useState<number>(0);

  // Función para calcular la suma total del día y del mes
  const calculateTotals = (expenses: IExpense[]) => {
    let totalDay = 0;
    let totalMonth = 0;

    const today = new Date().toISOString().split("T")[0]; // Fecha de hoy en formato YYYY-MM-DD

    expenses.forEach((expense) => {
      const expenseDate = new Date(expense.date).toISOString().split("T")[0]; // Compara solo la fecha

      // Si la fecha del gasto es de hoy
      if (expenseDate === today) {
        totalDay += expense.price;
      }

      // Si el gasto es de este mes (comprobamos si el año y mes coinciden)
      const expenseMonth = new Date(expense.date).getMonth();
      const currentMonth = new Date().getMonth();
      const expenseYear = new Date(expense.date).getFullYear();
      const currentYear = new Date().getFullYear();

      // Compara el año y mes
      if (expenseYear === currentYear && expenseMonth === currentMonth) {
        totalMonth += expense.price;
      }
    });

    setTotalDay(totalDay);
    setTotalMonth(totalMonth);
  };

  // Obtener los gastos al cargar el componente
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const fetchedExpenses = await getAllExpenses();
        setExpenses(fetchedExpenses);
        calculateTotals(fetchedExpenses);
      } catch (error) {
        console.error("Error al obtener los gastos:", error);
        alert("Hubo un error al obtener los gastos.");
      }
    };

    fetchExpenses();
  }, []); // Solo se ejecuta al montar el componente

  // Función para editar un gasto
  const handleEdit = (expense: IExpense) => {
    // Lógica para editar, por ejemplo, abrir un modal o redirigir a una página de edición
    console.log("Editar gasto:", expense);
  };

  // Función para eliminar un gasto
  const handleDelete = (id: string) => {
    alert(id);
    console.log("Eliminar gasto con ID:", id);
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
