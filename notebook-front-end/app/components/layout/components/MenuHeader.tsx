import Link from "next/link";
import {
  FaBell,
  FaHourglassHalf,
  FaLightbulb,
  FaMapMarkerAlt,
  FaMoneyBillWave,
} from "react-icons/fa";

export const MenuUser = () => {
  return (
    <>
      <div className="">
        <div className="flex ">
          <Link
            href="/supermarkets"
            className="px-4 py-3 text-sm grid text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            <FaMapMarkerAlt className="mx-7 text-lg" />
            Supermercados
          </Link>
          <Link
            href="/Shopping"
            className="px-4 text-sm py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            <FaLightbulb className="mx-7 text-lg" />
            Compras pendientes
          </Link>
          <Link
            href="/specialDates"
            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            <FaHourglassHalf className="mx-7 text-lg" />
            Recordatorios
          </Link>
          <Link
            href="/dailyExpenses"
            className="px-4 text-sm py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            <FaMoneyBillWave className=" mx-7 text-lg" /> Gastos Diarios
          </Link>
          <Link
            href="/dailyExpenses"
            className="px-4 text-sm py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            <FaBell className="mx-6 text-lg" />
            Notificación
          </Link>
        </div>
      </div>
    </>
  );
};
