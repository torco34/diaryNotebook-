"use client";

import { useState } from "react";
import ProfileCard from "../components/profile/PerfilCard";
import CardDate from "../components/profile/cardMenuProfile/CardDate";

const ProfileUser = () => {
  const [activeTab, setActiveTab] = useState<string>("Fechas importantes");
  const handleEdit = (id: number) => {
    console.log(`Editar evento con ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    console.log(`Eliminar evento con ID: ${id}`);
  };

  const handleNotification = (id: number) => {
    console.log(`Enviar notificación para el evento con ID: ${id}`);
  };
  const events = [
    {
      id: 1,
      title: "Reunión de Estrategia",
      description: "Reunión para revisar los objetivos del trimestre.",
      time: "12:30 PM",
      diaSemana: "Miércoles",
    },
    {
      id: 2,
      title: "Reunión de Progreso",
      description: "Reunión para analizar los avances del proyecto.",
      time: "02:00 PM",
      diaSemana: "Martes",
    },
    {
      id: 3,
      title: "Reunión de Progreso",
      description: "Reunión para analizar los avances del proyecto.",
      time: "02:00 PM",
      diaSemana: "Martes",
    },
    {
      id: 4,
      title: "Reunión de Progreso",
      description: "Reunión para analizar los avances del proyecto.",
      time: "02:00 PM",
      diaSemana: "Martes",
    },
  ];

  const gastos = [
    {
      id: 1,
      title: "Gastos 3/12/24",
      description: "120.000 ",
      time: "Total del mes 450.000",
      diaSemana: "Miércoles",
    },
    {
      id: 2,
      title: "Gastos 2/12/24",
      description: "120.000 ",
      time: "Total del mes 350.000",
      diaSemana: "Martes",
    },
  ];

  return (
    <div className="w-full h-screen  bg-blue-950 text-white flex  p-5 ">
      <main className="flex flex-col w-full">
        <div className="flex p-5 text-blue-950">
          <ProfileCard
            src="https://randomuser.me/api/portraits/women/42.jpg"
            alt="Imagen de perfil de Torcoroma"
            name="Torcoroma Arias Ascanio"
            title="Desarrollador Web | Backend & Frontend"
            width={128}
            height={128}
            className="rounded-full mx-auto"
            onClick={() => alert("Imagen de perfil clickeada")}
          />
        </div>
        <div className="flex justify-center gap-6 w-full top-30 right-0 absolute mt-9">
          {[
            "Fechas importantes",
            "Gastos diarios",
            "Compras por hacer",
            "Promociones en super",
          ].map((tab) => (
            <span
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer px-4 py-2 font-semibold rounded-lg transition ${
                activeTab === tab
                  ? "text-red-400 "
                  : "bg-gra-300 text-gray-100 hover:text-red-400"
              }`}
            >
              {tab}
              <hr />
            </span>
          ))}
          <hr />
        </div>
        <div className="mt-6">
          {activeTab === "Fechas importantes" && (
            <div className="container flex gap-4 bg-slate-500 items-center justify-center ">
              {events.map((event) => (
                <CardDate
                  key={event.id}
                  title={event.title}
                  description={event.description}
                  diaSemana={event.diaSemana}
                  time={event.time}
                  onEdit={() => handleEdit(event.id)}
                  onDelete={() => handleDelete(event.id)}
                  onNotification={() => handleNotification(event.id)}
                />
              ))}
            </div>
          )}
          {activeTab === "Gastos diarios" && (
            <div>
              {gastos.map((data) => (
                <div
                  key={data.id}
                  className="bg-white text-gray-800 p-4 rounded-lg mb-2 shadow-md"
                >
                  <h2 className="text-lg font-semibold">{data.title}</h2>
                  <p>{data.description}</p>
                  <p>{data.time}</p>
                  <p>
                    <strong>Día:</strong> {data.diaSemana}
                  </p>
                </div>
              ))}
            </div>
          )}
          {activeTab === "Compras por hacer" && (
            <div>
              <p>No hay compras pendientes registradas.</p>
            </div>
          )}
          {activeTab === "Promociones en super" && (
            <div>
              <p>No hay promociones activas en este momento.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProfileUser;
