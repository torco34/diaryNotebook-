import React from "react";

import Link from "next/link";
import { FaBook } from "react-icons/fa";

export const MenuLogo: React.FC = () => {
  return (
    <div className="flex items-center p-2.5">
      <Link href="/" className="flex items-center space-x-2.5">
        <FaBook className="text-2xl text-orange-400 mr-2.5" />
        <h1 className="text-3xl   text-blue-950 font-bold">Diary Notebook</h1>
      </Link>
    </div>
  );
};
