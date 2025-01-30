import { ErrorMessage, Field } from "formik";

import { IBaseTextForm } from "./ts/BaseFormType";

export const BaseFormText = ({
  name,
  label,
  type = "text",
  placeholder,
}: IBaseTextForm) => (
  <div className="mb-4">
    <label
      htmlFor={name}
      className="block text-blue-950 text-lg text-foregr mb-2"
    >
      {label}
    </label>
    <Field
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      className="w-full px-4 py-2 text-blue-950 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
    />
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-500 text-sm mt-1"
    />
  </div>
);
