import { BaseButtonProps } from "./ts/BaseType";

// export const BaseButton = ({
//   label,
//   variant = "primary",
//   onClick,
//   icon,
//   className = "",
// }: BaseButtonProps) => {
//   // Variantes de TailwindCSS
//   const baseStyle = "px-4 py-2 rounded font-bold transition-colors";
//   const variants: Record<string, string> = {
//     primary: "bg-orange-500 hover:bg-orange-400",
//     secondary: "bg-blue-900 hover:bg-blue-950",
//     danger: "bg-gray-100 hover:bg-gray-100",
//     white: "bg-white text-gray-800 hover:bg-gray-100 border border-gray-300",
//   };

//   // Combina los estilos base con la variante específica
//   const buttonStyle = `${baseStyle} ${
//     variants[variant] || variants.primary
//   } ${className}`;

//   return (
//     <button onClick={onClick} className={buttonStyle}>
//       {label}
//       {icon && <span className="text-lg">{icon}</span>}
//     </button>
//   );
// };
export const BaseButton = ({
  label,
  variant = "primary",
  onClick,
  icon,
  className = "",
  type = "button", // Predeterminado a "button" si no se especifica
}: BaseButtonProps) => {
  const baseStyle = "px-4 py-2 rounded font-bold transition-colors";
  const variants: Record<string, string> = {
    primary: "bg-orange-500 hover:bg-orange-400",
    secondary: "bg-blue-900 hover:bg-blue-950",
    danger: "bg-gray-100 hover:bg-gray-100",
    white: "bg-white text-gray-800 hover:bg-gray-100 border border-gray-300",
  };

  const buttonStyle = `${baseStyle} ${
    variants[variant] || variants.primary
  } ${className}`;

  return (
    <button onClick={onClick} className={buttonStyle} type={type}>
      {label}
      {icon && <span className="text-lg">{icon}</span>}
    </button>
  );
};
