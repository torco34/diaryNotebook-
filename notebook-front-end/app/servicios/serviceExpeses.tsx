import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export interface IExpense {
  _id: string | undefined;
  id: string;
  name: string;
  price: number;
  date: string; // Asegúrate de enviar las fechas en formato ISO
  dayOfWeek: string;
}

// Crear un nuevo gasto
export const createExpense = async (expense: IExpense): Promise<IExpense> => {
  try {
    const response = await axios.post<IExpense>(`${API_URL}/expenses`, expense);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        `Error al crear gasto: ${error.response.status} - ${
          error.response.data.message || error.message
        }`
      );
    }
    throw new Error("Error al eliminar gasto: " + (error as Error).message);
  }
};

// Obtener todos los gastos
export const getAllExpenses = async (): Promise<IExpense[]> => {
  try {
    const response = await axios.get<IExpense[]>(`${API_URL}/expenses`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        `Error al obtener gastos: ${error.response.status} - ${
          error.response.data.message || error.message
        }`
      );
    }
    throw new Error("Error al eliminar gasto: " + (error as Error).message);
  }
};

// Actualizar un gasto
export const updateExpense = async (
  id: string,
  expense: Partial<IExpense>
): Promise<IExpense> => {
  if (!id) throw new Error("❌ El ID no es válido.");

  // Eliminar el campo 'id' antes de enviar la solicitud
  const { id: _, ...cleanExpense } = expense;

  console.log("📝 ID enviado al backend:", id);
  console.log("📦 Datos enviados al backend (sin ID):", cleanExpense);

  try {
    const response = await axios.put<IExpense>(
      `${API_URL}/expenses/${id}`,
      cleanExpense
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        `Error al actualizar gasto: ${error.response.status} - ${
          error.response.data.message || error.message
        }`
      );
    }
    throw new Error("Error al actualizar gasto: " + (error as Error).message);
  }
};

// export const updateExpense = async (id: string, updatedExpense: IExpense) => {
//   console.log("📝 ID enviado al backend:", id);
//   console.log("📦 Datos enviados al backend:", JSON.stringify(updatedExpense, null, 2));

//   try {
//     const response = await axios.put(`http://localhost:4000/api/expenses/${id}`, updatedExpense, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     return response.data;
//   } catch (error) {
//     console.error("❌ Error en la petición de actualización:", error);
//     throw error;
//   }
// };

// Eliminar un gasto
export const deleteExpense = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/expenses/${id}`);
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        `Error al eliminar gasto: ${error.response.status} - ${
          error.response.data.message || error.message
        }`
      );
    }
    throw new Error("Error al eliminar gasto: " + (error as Error).message);
  }
};
