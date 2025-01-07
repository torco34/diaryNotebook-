import { BaseButtonProps } from "./ts/BaseType";

export const BaseButton = ({
  label,
  variant = "primary",
  onClick,
  icon,
  className = "",
}: BaseButtonProps) => {
  // Variantes de TailwindCSS
  const baseStyle = "px-4 py-2 rounded font-bold transition-colors";
  const variants: Record<string, string> = {
    primary: "bg-orange-500 hover:bg-orange-400",
    secondary: "bg-blue-900 hover:bg-blue-950",
    danger: "bg-gray-100 hover:bg-gray-100",
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
