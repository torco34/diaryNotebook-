"use client";
import Link from "next/link";
import { FaReplyAll } from "react-icons/fa";

export default function Dashboard() {
  return (
    <>
      <div className="min-h-screen p-10  text-white">
        <h1></h1>
        <Link href="/viewProfile" className="flex font-semibold gap-2">
          <FaReplyAll className="text-white font-semibold text-2xl" /> Ver
          Perfil
        </Link>
      </div>
    </>
  );
}
