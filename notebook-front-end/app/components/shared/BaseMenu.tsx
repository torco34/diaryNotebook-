import Link from "next/link";

import { MenuUserProps } from "./ts/BaseType";

export const BaseMenu = ({ links }: MenuUserProps) => {
  return (
    <div className="flex flex-col  bg-blue-100 rounded-md shadow-lg w-48">
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className="flex px-4 py-3 text-blue-950 hover:bg-blue-200 cursor-pointer"
        >
          {link.icon && (
            <span className="text-lg mx-2 text-orange-500 mb-3 ">
              {link.icon}
            </span>
          )}

          {link.label}
        </Link>
      ))}
    </div>
  );
};
