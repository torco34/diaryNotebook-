export interface IFormInput {
  name: string;
  email: string;
  password: string;
  city?: string;
}
export interface FormCreateProps {
  name: string;
  product: string;
  price: number | string; // Puede ser un string hasta que pase la validación.
  date: string;
  day: string;
}
