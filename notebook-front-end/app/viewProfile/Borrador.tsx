// "use client";

// import ProfileCard from "../components/profile/PerfilCard";

// const ProfileUser = () => {
//   // const events = [
//   //   {
//   //     id: 1,
//   //     title: "Reunión de Estrategia",
//   //     description: "Reunión para revisar los objetivos del trimestre.",
//   //     time: "12:30 PM",
//   //     diaSemana: "Miércoles",
//   //   },
//   //   {
//   //     id: 2,
//   //     title: "Reunión de Progreso",
//   //     description: "Reunión para analizar los avances del proyecto.",
//   //     time: "02:00 PM",
//   //     diaSemana: "Martes",
//   //   },
//   // ];
//   // const gastos = [
//   //   {
//   //     id: 1,
//   //     title: "Gastos 3/12/24",
//   //     description: "120.000 ",
//   //     time: "Total del mes 450.000  ",
//   //     diaSemana: "Miércoles",
//   //   },
//   //   {
//   //     id: 2,
//   //     title: "Gastos 2/12/24",
//   //     description: "120.000 ",
//   //     time: "Total del mes 350.000  ",
//   //     diaSemana: "Martes",
//   //   },
//   // ];

//   return (
//     <>
//       <div className="w-full h-screen    bg-blue-950   text-white flex items-cente p-5 justify-center">
//         <main className="flex flex-col  w-full ">
//           <div className="flex p-5 text-blue-950">
//             <div>
//               <ProfileCard
//                 src="https://randomuser.me/api/portraits/women/42.jpg"
//                 alt="Imagen de perfil de Torcoroma"
//                 name="Torcoroma Arias Ascanio"
//                 title="Desarrollador Web | Backend & Frontend"
//                 width={128}
//                 height={128}
//                 className="rounded-full mx-auto"
//                 onClick={() => alert("Imagen de perfil clickeada")} // Manejo del clic
//               />
//             </div>
//             <div className="mx-6 ">
//               <div className="flex justify-center ">
//                 <button className="bg-white  font-semibold text-red-400 px-4 py-2 rounded-lg hover:bg-red-300 transition">
//                   Fechas importante
//                 </button>
//               </div>
//               {/*
//               {events.map((data) => (
//                 <ProfileCardDaily
//                   key={data.id}
//                   title={data.title}
//                   description={data.description}
//                   time={data.time}
//                   diaSemana={data.diaSemana}
//                   onEdit={() => console.log(`Editar ${data.title}`)}
//                   onDelete={() => console.log(`Eliminar ${data.title}`)}
//                 />
//               ))} */}
//             </div>
//             <div className="mx-6 ">
//               <button className="bg-red-400  font-semibold text-gray-100 px-4 py-2 rounded-lg hover:bg-red-00 transition">
//                 Gastos diarios
//               </button>
//               {/* {gastos.map((data) => (
//                 <ProfileCardDate
//                   key={data.id}
//                   title={data.title}
//                   description={data.description}
//                   time={data.time}
//                   diaSemana={data.diaSemana}
//                   onEdit={() => console.log(`Editar ${data.title}`)}
//                   onDelete={() => console.log(`Eliminar ${data.title}`)}
//                 />
//               ))} */}
//             </div>
//             <div className="mx-6 ">
//               <button className="bg-red-400  font-semibold text-gray-100 px-4 py-2 rounded-lg hover:bg-red-00 transition">
//                 Compras por hacer
//               </button>
//               {/* {gastos.map((data) => (
//                 <ProfileCardDate
//                   key={data.id}
//                   title={data.title}
//                   description={data.description}
//                   time={data.time}
//                   diaSemana={data.diaSemana}
//                   onEdit={() => console.log(`Editar ${data.title}`)}
//                   onDelete={() => console.log(`Eliminar ${data.title}`)}
//                 />
//               ))} */}
//             </div>
//             <div className="mx-6 ">
//               <button className="bg-red-400  font-semibold text-gray-100 px-4 py-2 rounded-lg hover:bg-red-00 transition">
//                 Promociones en super
//               </button>
//               {/* {gastos.map((data) => (
//                 <ProfileCardDate
//                   key={data.id}
//                   title={data.title}
//                   description={data.description}
//                   time={data.time}
//                   diaSemana={data.diaSemana}
//                   onEdit={() => console.log(`Editar ${data.title}`)}
//                   onDelete={() => console.log(`Eliminar ${data.title}`)}
//                 />
//               ))} */}
//             </div>
//           </div>
//         </main>
//       </div>
//     </>
//   );
// };

// export default ProfileUser;
