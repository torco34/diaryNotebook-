import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import {
  deleteExpense,
  getAllExpenses,
  IExpense,
  updateExpense,
} from "../servicios/serviceExpeses";

export function useExpenses() {
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const [totalDay, setTotalDay] = useState<number>(0);
  const [totalMonth, setTotalMonth] = useState<number>(0);
  const [filteredExpenses, setFilteredExpenses] = useState<IExpense[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Función para calcular la suma total del día y del mes
  const calculateTotals = (expenses: IExpense[]) => {
    let totalDay = 0;
    let totalMonth = 0;

    const today = new Date().toISOString().split("T")[0];
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    expenses.forEach((expense) => {
      const expenseDate = new Date(expense.date).toISOString().split("T")[0];

      if (expenseDate === today) {
        totalDay += expense.price;
      }

      const expenseMonth = new Date(expense.date).getMonth();
      const expenseYear = new Date(expense.date).getFullYear();

      if (expenseYear === currentYear && expenseMonth === currentMonth) {
        totalMonth += expense.price;
      }
    });

    setTotalDay(totalDay);
    setTotalMonth(totalMonth);
  };

  useEffect(() => {
    const fetchExpenses = async () => {
      setLoading(true);
      try {
        const fetchedExpenses = await getAllExpenses();
        setExpenses(fetchedExpenses);
        setFilteredExpenses(fetchedExpenses);
        calculateTotals(fetchedExpenses);
      } catch (error) {
        console.error("Error al obtener los gastos:", error);
        setError("Hubo un error al obtener los gastos.");
        toast.error("❌ Hubo un error al obtener los gastos.");
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  // Función para manejar la búsqueda
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);

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
      toast.error("ID del gasto no es válido.");
      return;
    }

    const confirmDelete = confirm(
      "¿Estás seguro de que quieres eliminar este gasto?"
    );
    if (!confirmDelete) return;

    try {
      await deleteExpense(id);
      const updatedExpenses = expenses.filter((expense) => expense.id !== id);
      setExpenses(updatedExpenses);
      setFilteredExpenses(updatedExpenses);
      calculateTotals(updatedExpenses);

      toast.success("✅ Gasto eliminado con éxito.");
    } catch (error) {
      console.error("Error al eliminar el gasto:", error);
      toast.error("⚠️ Hubo un error al eliminar el gasto.");
    }
  };

  // Función para editar un gasto
  const handleEdit = async (updatedExpense: IExpense) => {
    if (!updatedExpense.id) {
      toast.error("El gasto no tiene un ID válido.");
      return;
    }

    try {
      const response = await updateExpense(updatedExpense.id, updatedExpense);

      const updatedExpenses = expenses.map((expense) =>
        expense.id === updatedExpense.id ? response : expense
      );

      setExpenses(updatedExpenses);
      setFilteredExpenses(updatedExpenses);
      calculateTotals(updatedExpenses);

      toast.success("✅ Gasto actualizado con éxito.");
    } catch (error) {
      console.error("Error al editar el gasto:", error);
      toast.error("⚠️ Hubo un error al editar el gasto.");
    }
  };

  return {
    expenses,
    totalDay,
    totalMonth,
    filteredExpenses,
    searchTerm,
    loading,
    error,
    handleSearch,
    handleDelete,
    handleEdit,
  };
}
