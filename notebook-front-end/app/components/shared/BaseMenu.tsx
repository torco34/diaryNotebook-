import Link from "next/link";

import { MenuUserProps } from "./ts/BaseType";

export const BaseMenu = ({ links }: MenuUserProps) => {
  return (
    <div className="flex flex-col mt-1 bg-white rounded-md shadow-lg w-48">
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className="flex px-4 py-3 text-gray-700 hover:bg-blue-100 cursor-pointer"
        >
          {link.icon && (
            <span className="text-lg mx-2 text-red-500 mb-3 ">{link.icon}</span>
          )}

          {link.label}
        </Link>
      ))}
    </div>
  );
};
