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
// type de BaseList 
export interface IExpense {
  _id: string | undefined;
  name: string;
  price: number;
  date: string;
  dayOfWeek: string;
}
export interface ExpenseListProps {
  expenses: IExpense[];
  title?: string; 
  showDate?: boolean; 
  onEdit?: (expense: IExpense) => void; 
  onDelete?: (id: string) => void; 
}