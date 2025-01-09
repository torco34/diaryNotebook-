import Link from "next/link";

import { BaseButton } from "../../shared/BaseButton";

interface NoAccountPromptProps {
  onLoginClick: () => void;
}

export const MenuPublic = ({ onLoginClick }: NoAccountPromptProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
      <span className="text-center sm:text-left text-lg font-bold text-blue-950">
        ¿No tienes cuenta?
      </span>
      <Link href="/viewAuth">
        <BaseButton
          label="Iniciar sesión"
          variant="primary"
          onClick={onLoginClick}
          className="text-slate-100 hover:text-black"
        />
      </Link>
    </div>
  );
};
