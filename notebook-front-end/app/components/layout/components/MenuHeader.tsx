import Link from "next/link";
import {
  FaBell,
  FaHourglassHalf,
  FaLightbulb,
  FaMapMarkerAlt,
  FaMoneyBillWave,
} from "react-icons/fa";

import headerData from "../../../json/headerData.json";

const iconMap = {
  FaMapMarkerAlt: FaMapMarkerAlt,
  FaLightbulb: FaLightbulb,
  FaHourglassHalf: FaHourglassHalf,
  FaMoneyBillWave: FaMoneyBillWave,
  FaBell: FaBell,
};

export const MenuUser = () => {
  return (
    <div className="">
      <div className="flex">
        {headerData.menuHeader.map((item, index) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap];
          return (
            <Link
              key={index}
              href={item.href}
              className="px-4 py-3 text-sm font-bold grid text-blue-950 hover:text-blue-800 cursor-pointer"
            >
              <Icon className="mx-7 text-orange-500 text-xl" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
