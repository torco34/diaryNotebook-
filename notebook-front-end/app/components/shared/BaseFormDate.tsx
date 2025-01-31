import { ErrorMessage, Field } from "formik";

interface BaseFormDateProps {
  name: string;
  label: string;
  placeholder: string;
}

export const BaseFormDate = ({ name, label, placeholder }: BaseFormDateProps) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-medium text-gray-100">
      {label}
    </label>
    <Field
      name={name}
      type="date"
      placeholder={placeholder}
      className="w-full mt-1 p-2 text-blue-950 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
    />
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-500 text-sm mt-1"
    />
  </div>
);
