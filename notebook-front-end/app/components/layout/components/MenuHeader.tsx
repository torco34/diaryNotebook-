import Link from "next/link";
import {
  FaBell,
  FaHourglassHalf,
  FaLightbulb,
  FaMapMarkerAlt,
  FaMoneyBillWave,
} from "react-icons/fa";

import headerData from "../../../json/headerData.json";

// Mapeo de iconos
const iconMap = {
  FaMapMarkerAlt: FaMapMarkerAlt,
  FaLightbulb: FaLightbulb,
  FaHourglassHalf: FaHourglassHalf,
  FaMoneyBillWave: FaMoneyBillWave,
  FaBell: FaBell,
};

export const MenuUser = () => {
  return (
    <div className="w-full relative z-50">
      {/* Contenedor principal del menú */}
      <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 ">
        {headerData.menuHeader.map((item, index) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap];
          return (
            <Link
              key={index}
              href={item.href}
              className="flex flex-col items-center  px-4 py-3 text-sm font-bold text-blue-950 hover:text-blue-800 cursor-pointer"
            >
              <span className="hidden md:block">
                <Icon className="text-orange-500 text-2xl mr-2" />
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
