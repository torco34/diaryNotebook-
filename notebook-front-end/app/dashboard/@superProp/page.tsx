"use client";

import { useEffect, useState } from "react";
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

  return (
    <div className="bg-gray-900 min-h-screen text-white p-10">
      {/* Contenedor para los totales */}
      <div className="flex justify-between items-center mb-8">
        <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-6 rounded-lg shadow-xl w-1/2">
          <h1 className="text-2xl font-bold">Suma total del día</h1>
          <p className="text-4xl font-semibold mt-2">${totalDay.toFixed(2)}</p>
        </div>
        <div className="bg-gradient-to-r from-green-600 to-teal-500 p-6 rounded-lg shadow-xl w-1/2 ml-6">
          <h1 className="text-2xl font-bold">Suma total del mes</h1>
          <p className="text-4xl font-semibold mt-2">
            ${totalMonth.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Lista de gastos */}
      <div>
        <h2 className="text-3xl font-semibold text-center mb-6">
          Lista de Gastos
        </h2>
        <div className="space-y-6">
          {expenses.map((expense) => (
            <div
              key={expense._id}
              className="bg-gray-800 p-4 rounded-lg shadow-lg flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-semibold">{expense.name}</h3>
                <p className="text-gray-400">{expense.dayOfWeek}</p>
              </div>
              <div>
                <p className="text-xl font-semibold text-green-400">
                  ${expense.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
