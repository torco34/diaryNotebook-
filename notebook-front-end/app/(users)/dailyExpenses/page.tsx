"use client";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DailyExpenses() {
  const [expenses, setExpenses] = useState([
    { id: 1, date: "2024-12-28", amount: 50, description: "Compra de comida" },
    { id: 2, date: "2024-12-27", amount: 30, description: "Taxi" },
    { id: 3, date: "2024-12-20", amount: 120, description: "Ropa" },
    { id: 4, date: "2024-11-15", amount: 200, description: "Electrodoméstico" },
    { id: 5, date: "2023-12-01", amount: 300, description: "Muebles" },
  ]);
  dayjs.extend(isBetween);
  const [filteredExpenses, setFilteredExpenses] = useState<{
    today: typeof expenses;
    yesterday: typeof expenses;
    thisWeek: typeof expenses;
    lastWeek: typeof expenses;
    thisMonth: typeof expenses;
    lastMonth: typeof expenses;
    thisYear: typeof expenses;
  }>({
    today: [],
    yesterday: [],
    thisWeek: [],
    lastWeek: [],
    thisMonth: [],
    lastMonth: [],
    thisYear: [],
  });

  useEffect(() => {
    const now = dayjs();
    const startOfWeek = now.startOf("week");
    const endOfWeek = now.endOf("week");
    const startOfLastWeek = startOfWeek.subtract(1, "week");
    const endOfLastWeek = startOfWeek.subtract(1, "day");
    const startOfMonth = now.startOf("month");
    const endOfLastMonth = startOfMonth.subtract(1, "day");
    const startOfLastMonth = startOfMonth.subtract(1, "month");

    setFilteredExpenses({
      today: expenses.filter((exp) => dayjs(exp.date).isSame(now, "day")),
      yesterday: expenses.filter((exp) =>
        dayjs(exp.date).isSame(now.subtract(1, "day"), "day")
      ),
      thisWeek: expenses.filter((exp) =>
        dayjs(exp.date).isBetween(startOfWeek, endOfWeek, "day", "[]")
      ),
      lastWeek: expenses.filter((exp) =>
        dayjs(exp.date).isBetween(startOfLastWeek, endOfLastWeek, "day", "[]")
      ),
      thisMonth: expenses.filter((exp) => dayjs(exp.date).isSame(now, "month")),
      lastMonth: expenses.filter((exp) =>
        dayjs(exp.date).isBetween(startOfLastMonth, endOfLastMonth, "day", "[]")
      ),
      thisYear: expenses.filter((exp) => dayjs(exp.date).isSame(now, "year")),
    });
  }, [expenses]);

  const totalAmount = (items: any[]) =>
    items.reduce((sum, item) => sum + item.amount, 0);

  // const addExpense = () => {
  //   const description = prompt("Descripción del gasto:");
  //   const amount = parseFloat(prompt("Monto del gasto:"));
  //   const date = prompt(
  //     "Fecha del gasto (YYYY-MM-DD):",
  //     dayjs().format("YYYY-MM-DD")
  //   );

  //   if (description && !isNaN(amount) && dayjs(date).isValid()) {
  //     setExpenses((prev) => [
  //       ...prev,
  //       { id: prev.length + 1, date, amount, description },
  //     ]);
  //   }
  // };

  return (
    <main className="grid min-h-screen justify-items-center p-4 bg-blue-950">
      <h1 className="text-2xl font-bold mb-4 text-blue-100">
        Seguimiento de Gastos Diarios
      </h1>
      <button className="mb-4 px-4 py-2 bg-blue-100 text-blue-950 rounded hover:bg-blue-200">
        <Link href="/dashboard"> Agregar Gasto</Link>
      </button>

      <div className="w-full max-w-4xl space-y-6">
        {Object.entries(filteredExpenses).map(([key, items]) => (
          <section key={key} className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">
              {key === "today"
                ? "Hoy"
                : key === "yesterday"
                ? "Ayer"
                : key === "thisWeek"
                ? "Semana Presente"
                : key === "lastWeek"
                ? "Semana Pasada"
                : key === "thisMonth"
                ? "Mes Presente"
                : key === "lastMonth"
                ? "Mes Pasado"
                : "Año Presente"}
            </h2>
            {items.length > 0 ? (
              <ul className="space-y-2">
                {items.map(({ id, description, amount, date }) => (
                  <li
                    key={id}
                    className="flex justify-between items-center p-2 border rounded-md"
                  >
                    <span>{description}</span>
                    <span className="text-gray-500 text-sm">
                      {dayjs(date).format("DD/MM/YYYY")}
                    </span>
                    <span className="font-semibold text-green-700">
                      ${amount.toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No hay gastos registrados.</p>
            )}
            <div className="text-right font-bold mt-2 text-blue-950">
              Total: ${totalAmount(items).toFixed(2)}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
