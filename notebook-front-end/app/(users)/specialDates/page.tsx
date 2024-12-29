"use client";
import { useEffect, useState } from "react";

export default function DailyExpenses() {
  const [dates, setDates] = useState([
    {
      id: 1,
      date: "2024-12-24T23:15:00",
      description: "Cita el 24 de julio hora 23:15",
      completed: false,
    },
    {
      id: 2,
      date: "2024-08-20T10:00:00",
      description: "Reclamar medicamentos el 20 agosto",
      completed: true,
    },
    {
      id: 3,
      date: "2025-01-28T20:00:00",
      description: "Compromiso una cena 28 de Enero",
      completed: false,
    },
    {
      id: 4,
      date: "2024-06-28T20:00:00",
      description: "Compromiso una cena 28 de junio",
      completed: false,
    },
    {
      id: 5,
      date: "2024-06-28T20:00:00",
      description: "Compromiso una cena 28 de junio",
      completed: false,
    },
  ]);

  const [nearestDate, setNearestDate] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState("");

  useEffect(() => {
    const upcomingDates = dates
      .filter((date) => !date.completed)
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    if (upcomingDates.length > 0) {
      setNearestDate(upcomingDates[0]);
    } else {
      setNearestDate(null);
    }
  }, [dates]);

  useEffect(() => {
    if (nearestDate) {
      const interval = setInterval(() => {
        const now = new Date();
        const target = new Date(nearestDate.date);
        const difference = target - now;

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((difference / (1000 * 60)) % 60);
          setTimeRemaining(`${days}d ${hours}h ${minutes}m`);
        } else {
          setTimeRemaining("¡Es hoy!");
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [nearestDate]);

  const toggleCompletion = (id) => {
    setDates((prevDates) =>
      prevDates.map((date) =>
        date.id === id ? { ...date, completed: !date.completed } : date
      )
    );
  };

  const editDate = (id, newDescription, newDate) => {
    setDates((prevDates) =>
      prevDates.map((date) =>
        date.id === id
          ? { ...date, description: newDescription, date: newDate }
          : date
      )
    );
  };

  const deleteDate = (id) => {
    setDates((prevDates) => prevDates.filter((date) => date.id !== id));
  };

  return (
    <main className=" min-h-screen  p-4 bg-blue-950">
      <div className=" grid  h-44 justify-items-center items-center  mb-4 ">
        <h1 className="text-2xl  font-bold mb-4 text-blue-100">
          Apuntes de fechas pendientes y cumplidas
        </h1>
      </div>
      <div className="flex justify-center gap-10 ">
        <div className="w-full max-w-md">
          <ul className="space-y-2">
            {dates.map(({ id, description, date, completed }) => (
              <li
                key={id}
                className={`flex justify-between items-center p-2 border rounded-lg shadow-md ${
                  completed
                    ? "bg-yellow-600 text-white"
                    : "bg-blue-00 text-white"
                }`}
              >
                <span className="flex-1 pr-4">{description}</span>
                <button
                  onClick={() => toggleCompletion(id)}
                  className="px-4 py-1 text-sm font-semibold bg-green-500 rounded hover:bg-green-600 mr-2"
                >
                  {completed ? "Pendiente" : "Cumplida"}
                </button>
                <button
                  onClick={() => {
                    const newDescription = prompt(
                      "Editar descripción:",
                      description
                    );
                    const newDate = prompt(
                      "Editar fecha (YYYY-MM-DDTHH:mm):",
                      date
                    );
                    if (newDescription && newDate)
                      editDate(id, newDescription, newDate);
                  }}
                  className="px-4 py-1 text-sm font-semibold bg-yellow-500 rounded hover:bg-yellow-600 mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteDate(id)}
                  className="px-4 py-1 text-sm font-semibold bg-red-500 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>
        {nearestDate && (
          <div className="mb-4 p-4 bg-yellow-200 border-l-4 border-yellow-600 rounded">
            <h2 className="text-lg font-semibold text-yellow-800">
              Próximo recordatorio
            </h2>
            <p>{nearestDate.description}</p>
            <p className="text-sm text-yellow-700">
              Tiempo restante: {timeRemaining}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
