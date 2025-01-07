import { ErrorMessage, Field } from "formik";
import { IBaseSelectForm } from "./ts/BaseFormType";

export const BaseFormSelect = ({
  name,
  label,
  options,
  placeholder,
}: IBaseSelectForm) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-lg text-foreground mb-2">
      {label}
    </label>
    <Field
      as="select"
      id={name}
      name={name}
      className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
    >
      <option value="">{placeholder}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </Field>
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-500 text-sm mt-1"
    />
  </div>
);
