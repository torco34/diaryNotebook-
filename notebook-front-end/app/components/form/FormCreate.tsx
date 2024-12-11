"use client";

import { Field, FieldArray, Form, Formik } from "formik";
import {
  AiOutlinePlus,
  AiOutlinePlusCircle,
  AiOutlineSave,
} from "react-icons/ai";
import { FaTrash } from "react-icons/fa";

export const FormCreate = () => {
  const daysOfWeek = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];
  const handleSubmit = async (values: {
    items: { name: string; price: string; date: string; dayOfWeek: string }[];
  }) => {
    try {
      const response = await fetch("/api/save-notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Error al enviar los datos al servidor.");
      }

      alert("Datos enviados con éxito");
    } catch (error) {
      console.error("Error al enviar datos:", error);
      alert("Hubo un error al enviar los datos.");
    }
  };
  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-blue-900 mb-4">Crear Apuntes</h1>
      <Formik
        initialValues={{
          items: [{ name: "", price: "", date: "", dayOfWeek: "Lunes" }],
        }}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className="space-y-6">
            <FieldArray
              name="items"
              render={(arrayHelpers) => (
                <div className="space-y-4">
                  {values.items && values.items.length > 0 ? (
                    values.items.map((item, index) => (
                      <div
                        key={index}
                        className="bg-gray-100 p-4 rounded-lg shadow-sm border border-gray-200"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Nombre del producto:
                            </label>
                            <Field
                              name={`items.${index}.name`}
                              placeholder="Producto"
                              className="w-full mt-1 p-2 text-blue-900 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Precio del producto:
                            </label>
                            <Field
                              name={`items.${index}.price`}
                              type="number"
                              placeholder="Precio"
                              className="w-full mt-1 text-gray-700 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Fecha:
                            </label>
                            <Field
                              name={`items.${index}.date`}
                              type="date"
                              className="w-full mt-1 p-2 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Día de la semana:
                            </label>
                            <Field
                              as="select"
                              name={`items.${index}.dayOfWeek`}
                              className="w-full mt-1 p-2 border text-gray-700 border-gray-300 rounded-md shadow-sm focus:ring-blue-900 focus:border-blue-500"
                            >
                              {daysOfWeek.map((day) => (
                                <option key={day} value={day}>
                                  {day}
                                </option>
                              ))}
                            </Field>
                          </div>
                        </div>
                        <div className="flex justify-end space-x-4 mt-4">
                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                            className="flex items-center space-x-1 text-red-500 hover:text-red-600"
                          >
                            <FaTrash size={20} />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              arrayHelpers.insert(index + 1, {
                                name: "",
                                price: "",
                                date: "",
                                dayOfWeek: "Lunes",
                              })
                            }
                            className="flex items-center space-x-2 text-green-600 hover:text-green-800"
                          >
                            <AiOutlinePlusCircle size={20} />
                            <span>Agregar</span>
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        arrayHelpers.push({
                          name: "",
                          price: "",
                          date: "",
                          dayOfWeek: "Lunes",
                        })
                      }
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-900 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
                    >
                      <AiOutlinePlus size={20} />
                      <span>Crear apuntes</span>
                    </button>
                  )}
                  {values.items.length > 0 && (
                    <div className="flex justify-center mt-6">
                      <button
                        type="submit"
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-900 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
                      >
                        <AiOutlineSave size={20} />
                        <span>Guardar apuntes</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};
