import { ReactNode } from "react";
export interface BaseButtonProps {
  label?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  variant?: string;
  primary?: string;
  icon?: ReactNode;
}
// tiado de la imagen

export interface BaseImgProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  onClick?: () => void;
}
export interface MenuUserProps {
  links: { label: string; href: string; icon?: ReactNode }[];
}
