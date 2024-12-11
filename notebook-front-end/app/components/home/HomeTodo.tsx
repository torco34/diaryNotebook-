"use client";

import BaseImg from "../shared/BaseImg";

const HomeTodo = () => {
  const handleClient = () => {
    // Aquí va la lógica para conectar con el cliente
    console.log("Conectando con el cliente...");
    // Simulamos que haya un error
    throw new Error("Error al conectar con el cliente");
  };
  return (
    <div className="w-full h-screen bg-gradient-to-r from-blue-900 via-amber-100 to-indigo-600 text-white flex items-center justify-center">
      <div className="w-[90%] max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Texto descriptivo */}
        <div className="bg-slate-100 p-8 rounded-lg shadow-lg  flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-snug text-gray-800 drop-shadow-lg">
            Este es una libreta de notas donde podrás apuntar tus gastos
            diarios, <br />
            fechas de pago y recordatorios importantes.
          </h2>
          <div className="flex w-full max-w-sm mt-8 gap-4">
            <button className="w-1/2 bg-yellow-500 text-gray-800 px-4 py-2 rounded-md font-semibold hover:bg-yellow-400 transition">
              Registrarse
            </button>
            <button className="w-1/2 bg-gray-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-gray-700 transition">
              Iniciar sesión
            </button>
          </div>
        </div>

        {/* Imagen */}
        <div className="flex items-center justify-center">
          <BaseImg
            src="https://cdn-icons-png.flaticon.com/512/2132/2132217.png"
            alt="Agenda o libreta de notas"
            width={500}
            height={300}
            onClick={handleClient}
            className="mb-6 mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeTodo;
