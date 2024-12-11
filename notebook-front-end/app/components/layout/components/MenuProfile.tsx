import Link from "next/link";
interface CustomMenu {
  onClick?: () => void;
}
export const MenuProfile = ({ onClick }: CustomMenu) => {
  return (
    <>
      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
        <div className="grid">
          <Link
            href="/viewProfile"
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            Perfil
          </Link>
          <Link
            href="/viewProfile"
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            Ajustes
          </Link>
          <Link
            href="/"
            onClick={onClick}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            Cerrar sesión
          </Link>
        </div>
      </div>
    </>
  );
};
