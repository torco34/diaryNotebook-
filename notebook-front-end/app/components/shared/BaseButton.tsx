import { BaseButtonProps } from "./ts/BaseType";

export const BaseButton = ({
  label,
  variant = "primary",
  onClick,
  icon,
  className = "",
}: BaseButtonProps) => {
  // Variantes de TailwindCSS
  const baseStyle = "px-4 py-2 rounded text-white font-bold transition-colors";
  const variants: Record<string, string> = {
    primary: "bg-blue-500 hover:bg-blue-600",
    secondary: "bg-gray-500 hover:bg-blue-950",
    danger: "bg-red-500 hover:bg-red-600",
  };

  // Combina los estilos base con la variante específica
  const buttonStyle = `${baseStyle} ${
    variants[variant] || variants.primary
  } ${className}`;

  return (
    <button onClick={onClick} className={buttonStyle}>
      {label}
      {icon && <span className="text-lg">{icon}</span>}
    </button>
  );
};
