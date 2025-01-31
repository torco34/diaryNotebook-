"use client";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

export default function Dashboard() {
  return (
    <>
      <div className="min-h-screen  p-10  text-white">
        <h1></h1>
        <Link href="/viewProfile" className="flex font-semibold gap-2">
          <MdArrowBack size={24} className="text-orange-400 cursor-pointer" />{" "}
          Ver Perfil
        </Link>
      </div>
    </>
  );
}
