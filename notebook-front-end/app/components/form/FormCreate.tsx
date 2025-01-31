"use client";

import { createExpense } from "@/app/servicios/serviceExpeses";
import { FieldArray, Form, Formik } from "formik";
import {
  AiOutlinePlus,
  AiOutlinePlusCircle,
  AiOutlineSave,
} from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { BaseButton } from "../shared/BaseButton";
import { BaseFormDate } from "../shared/BaseFormDate";
import { BaseFormSelect } from "../shared/BaseFormSelect";
import { BaseFormText } from "../shared/BaseFormText";

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
      const expenses = values.items.map((item) => ({
        name: item.name,
        price: parseFloat(item.price),
        date: item.date,
        dayOfWeek: item.dayOfWeek,
      }));

      for (const expense of expenses) {
        await createExpense(expense);
      }

      alert("Datos enviados con éxito");
    } catch (error: unknown) {
      console.error("Error al enviar datos:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-blue-950 mb-4 underline decoration-orange-400">
        Crear Apuntes
      </h1>
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
                        className="bg-blue-950 p-4 rounded-lg shadow-sm border border-gray-200"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <BaseFormText
                              name={`items.${index}.name`}
                              label="Nombre del producto:"
                              placeholder="Producto"
                            />
                          </div>
                          <div>
                            <BaseFormText
                              name={`items.${index}.price`}
                              label="Precio del producto:"
                              type="number"
                              placeholder="Precio"
                            />
                          </div>
                          <div>
                            <BaseFormDate
                              name={`items.${index}.date`}
                              label="Fecha"
                              placeholder="Selecciona una fecha"
                            />
                          </div>
                          <div>
                            <BaseFormSelect
                              name={`items.${index}.dayOfWeek`}
                              label="Día de la semana:"
                              options={daysOfWeek}
                              placeholder="Selecciona un día"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end space-x-4 mt-4">
                          <BaseButton
                            icon={<FaTrash size={20} />}
                            variant="danger"
                            onClick={() => arrayHelpers.remove(index)}
                            className="flex items-center text-orange-400 space-x-1 hover:text-red-500"
                          />

                          <BaseButton
                            label={
                              <>
                                <AiOutlinePlusCircle size={20} />
                                <span>Agregar</span>
                              </>
                            }
                            variant="white"
                            onClick={() =>
                              arrayHelpers.insert(index + 1, {
                                name: "",
                                price: "",
                                date: "",
                                dayOfWeek: "Lunes",
                              })
                            }
                            className="flex items-center space-x-2 text-orange-400 hover:text-orange-600"
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <BaseButton
                      label={
                        <>
                          <AiOutlinePlus size={20} />
                          <span>Crear apuntes</span>
                        </>
                      }
                      variant="primary"
                      onClick={() =>
                        arrayHelpers.push({
                          name: "",
                          price: "",
                          date: "",
                          dayOfWeek: "Lunes",
                        })
                      }
                      className="flex items-center space-x-2 px-4 py-2 font-semibold rounded-lg shadow-md bg-orange-400 text-gray-100 hover:bg-orange-500"
                    />
                  )}
                  {values.items.length > 0 && (
                    <div className="flex justify-center mt-6">
                      <BaseButton
                        label={
                          <>
                            <AiOutlineSave size={20} />
                            <span>Guardar apuntes</span>
                          </>
                        }
                        variant="secondary"
                        type="submit"
                        className="flex items-center space-x-2 px-4 py-2 font-semibold rounded-lg shadow-md bg-orange-400 text-gray-100 hover:bg-orange-500"
                      />
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
