// hooks/useExpenses.ts
import { useEffect, useState } from "react";

import axios from "axios";

import {
  deleteExpense,
  getAllExpenses,
  IExpense,
} from "../servicios/serviceExpeses";

// Define la interfaz IExpense

export function useExpenses() {
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const [totalDay, setTotalDay] = useState<number>(0);
  const [totalMonth, setTotalMonth] = useState<number>(0);
  const [filteredExpenses, setFilteredExpenses] = useState<IExpense[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Función para calcular la suma total del día y del mes
  const calculateTotals = (expenses: IExpense[]) => {
    let totalDay = 0;
    let totalMonth = 0;

    const today = new Date().toISOString().split("T")[0]; // Fecha de hoy en formato YYYY-MM-DD
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    expenses.forEach((expense) => {
      const expenseDate = new Date(expense.date).toISOString().split("T")[0]; // Compara solo la fecha

      if (expenseDate === today) {
        totalDay += expense.price;
      }

      // Si el gasto es de este mes (comprobamos si el año y mes coinciden)
      const expenseMonth = new Date(expense.date).getMonth();
      const expenseYear = new Date(expense.date).getFullYear();

      if (expenseYear === currentYear && expenseMonth === currentMonth) {
        totalMonth += expense.price;
      }
    });

    setTotalDay(totalDay);
    setTotalMonth(totalMonth);
  };

  // Obtener los gastos al cargar el hook usando Axios
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const fetchedExpenses = await getAllExpenses();
        setExpenses(fetchedExpenses);
        calculateTotals(fetchedExpenses);
        setFilteredExpenses(fetchedExpenses); // Mostrar todos los gastos inicialmente
        calculateTotals(fetchedExpenses);
      } catch (error) {
        console.error("Error al obtener los gastos:", error);
        alert("Hubo un error al obtener los gastos.");
      }
    };

    fetchExpenses();
  }, []); // Solo se ejecuta al montar el componente

  // Función para manejar la búsqueda
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);

    // Filtrar gastos por nombre o día de la semana
    const filtered = expenses.filter(
      (expense) =>
        expense.name.toLowerCase().includes(searchValue) ||
        expense.dayOfWeek.toLowerCase().includes(searchValue)
    );
    setFilteredExpenses(filtered);
  };

  // Función para eliminar un gasto

  const handleDelete = async (id: string | undefined) => {
    if (!id) {
      alert("ID del gasto no es válido.");
      return;
    }

    const confirmDelete = confirm(
      "¿Estás seguro de que quieres eliminar este gasto?"
    );
    if (!confirmDelete) return;

    try {
      await deleteExpense(id); // ✅ Usamos 'id' correctamente aquí
      setExpenses((prev) => prev.filter((expense) => expense.id !== id)); // ✅ Cambiar '_id' por 'id'
      setFilteredExpenses((prev) =>
        prev.filter((expense) => expense.id !== id)
      ); // ✅ Cambiar '_id' por 'id'
      calculateTotals(expenses); // Recalcula los totales
    } catch (error) {
      console.error("Error al eliminar el gasto:", error);
      alert("Hubo un error al eliminar el gasto.");
    }
  };

  // Función para editar un gasto
  const handleEdit = async (updatedExpense: IExpense) => {
    alert("¿Estás seguro de que quieres eliminar este gasto?");
    try {
      await axios.put(`/api/expenses/${updatedExpense._id}`, updatedExpense); // Llamada PUT para actualizar el gasto en la base de datos
      // Actualizar el gasto en el estado local
      setExpenses(
        expenses.map((expense) =>
          expense._id === updatedExpense._id ? updatedExpense : expense
        )
      );
      setFilteredExpenses(
        filteredExpenses.map((expense) =>
          expense._id === updatedExpense._id ? updatedExpense : expense
        )
      );
      calculateTotals(expenses); // Recalcular los totales
    } catch (error) {
      console.error("Error al editar el gasto:", error);
      alert("Hubo un error al editar el gasto.");
    }
  };

  return {
    expenses,
    totalDay,
    totalMonth,
    filteredExpenses,
    searchTerm,
    handleSearch,
    handleDelete,
    handleEdit,
  };
}
