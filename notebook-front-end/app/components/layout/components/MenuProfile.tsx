import Link from "next/link";

import headerData from "../../../json/headerData.json"; // Ajusta la ruta según tu estructura

interface CustomMenu {
  onClick?: () => void;
}

export const MenuProfile = ({ onClick }: CustomMenu) => {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-slate-100 border border-gray-300 rounded-md shadow-lg">
      <div className="grid">
        {headerData.menuProfile.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            onClick={item.onClick ? onClick : undefined}
            className={item.className}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};
