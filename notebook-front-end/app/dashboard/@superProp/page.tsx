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
    <div className="mx-10 text-white">
      <h1 className="text-white p-5">Suma total del día: ${totalDay}</h1>
      <h1 className="text-white p-5">Suma total del mes: ${totalMonth}</h1>

      {/* Mostrar los gastos en una lista */}
      <div className="p-5">
        <h2 className="text-white">Gastos:</h2>
        <ul>
          {expenses.map((expense) => (
            <li key={expense._id} className="text-white">
              <strong>{expense.name}</strong> - ${expense.price} (
              {expense.dayOfWeek})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
