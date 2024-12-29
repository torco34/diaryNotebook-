"use client";
import { useState } from "react";
import { FiCheckCircle, FiTrash2 } from "react-icons/fi"; // Usamos iconos de react-icons

export default function PendingPurchases() {
  const [purchases, setPurchases] = useState([
    { id: 1, name: "Zapatos nuevos", completed: false },
    { id: 2, name: "Leche", completed: false },
    { id: 3, name: "Pan", completed: false },
  ]);
  const [newPurchase, setNewPurchase] = useState("");

  const addPurchase = () => {
    if (newPurchase.trim()) {
      setPurchases([
        ...purchases,
        { id: purchases.length + 1, name: newPurchase, completed: false },
      ]);
      setNewPurchase("");
    }
  };

  const toggleCompleted = (id) => {
    setPurchases(
      purchases.map((purchase) =>
        purchase.id === id
          ? { ...purchase, completed: !purchase.completed }
          : purchase
      )
    );
  };

  const deletePurchase = (id) => {
    setPurchases(purchases.filter((purchase) => purchase.id !== id));
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-pink-500 via-pink-300 to-pink-100 p-6">
      <h1 className="text-4xl font-semibold text-center text-white mb-6">
        Lista de Compras Pendientes
      </h1>

      {/* Formulario de ingreso de nueva compra */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          value={newPurchase}
          onChange={(e) => setNewPurchase(e.target.value)}
          className="p-3 w-72 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder="Añadir compra..."
        />
        <button
          onClick={addPurchase}
          className="ml-3 p-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 focus:outline-none"
        >
          Añadir
        </button>
      </div>

      {/* Lista de compras pendientes */}
      <div className="max-w-3xl mx-auto">
        {purchases.length > 0 ? (
          <ul className="space-y-4">
            {purchases.map(({ id, name, completed }) => (
              <li
                key={id}
                className={`flex justify-between items-center p-4 rounded-lg ${
                  completed
                    ? "bg-green-100 line-through text-gray-500"
                    : "bg-white shadow-md"
                }`}
              >
                <span>{name}</span>
                <div className="flex items-center">
                  <button
                    onClick={() => toggleCompleted(id)}
                    className="p-2 text-green-500 hover:text-green-700"
                  >
                    <FiCheckCircle size={20} />
                  </button>
                  <button
                    onClick={() => deletePurchase(id)}
                    className="ml-3 p-2 text-red-500 hover:text-red-700"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">
            No hay compras pendientes.
          </p>
        )}
      </div>
    </main>
  );
}
