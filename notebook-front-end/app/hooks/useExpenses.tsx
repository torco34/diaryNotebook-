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

  // Función para calcular los totales
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
        setError("Hubo un error al obtener los gastos.");
        toast.error("❌ Hubo un error al obtener los gastos.");
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

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
      const updatedExpenses = expenses.filter((expense) => expense._id !== id);
      setExpenses(updatedExpenses);
      setFilteredExpenses(updatedExpenses);
      calculateTotals(updatedExpenses);

      toast.success("✅ Gasto eliminado con éxito.");
    } catch (error) {
      toast.error("⚠️ Hubo un error al eliminar el gasto.");
    }
  };

  // Función para editar un gasto
  const handleEdit = async (updatedExpense: IExpense) => {
    if (!updatedExpense) {
      toast.error("No se ha proporcionado un gasto para editar.");
      return;
    }

    if (!updatedExpense.id) {
      toast.error("El gasto no tiene un ID válido.");
      return;
    }

    // Validar el precio como número
    const price = Number(updatedExpense.price);
    if (isNaN(price) || price <= 0) {
      console.error("❌ Error: El valor de 'price' no es un número válido.");
      toast.error("⚠️ El valor del gasto debe ser un número positivo.");
      return;
    }

    try {
      // Llamada única a la API
      const response = await updateExpense(updatedExpense.id, {
        ...updatedExpense,
        price,
      });

      console.log("✅ Gasto actualizado:", response);

      // Actualizar la lista de gastos
      const updatedExpenses = expenses.map((expense) =>
        expense.id === updatedExpense.id ? response : expense
      );

      setExpenses(updatedExpenses);
      setFilteredExpenses(updatedExpenses);
      calculateTotals(updatedExpenses);

      toast.success("✅ Gasto actualizado con éxito.");
    } catch (error) {
      console.error("❌ Error en la actualización:", error);
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
    handleDelete,
    handleEdit,
  };
}