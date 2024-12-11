"use client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";

import { useState } from "react";
interface IFormInput {
  name: string;
  email: string;
  password: string;
  city?: string; // Solo en registro, es opcional
}

const cities = ["Madrid", "Barcelona", "Sevilla", "Valencia", "Bilbao"]; // Lista de ciudades

const FormAuth = () => {
  const [isLogin, setIsLogin] = useState(true); // Estado para controlar el cambio entre Login y Registro
  const router = useRouter();
  const initialValues: IFormInput = {
    name: "",
    email: "",
    password: "",
    city: "", // Solo en registro, será opcional
  };

  const validate = (values: IFormInput) => {
    const errors: Partial<IFormInput> = {};

    if (!values.email) {
      errors.email = "El correo es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "El formato del correo es inválido";
    }

    if (!isLogin && !values.name) {
      errors.name = "El nombre es obligatorio";
    }

    if (!values.password) {
      errors.password = "La contraseña es obligatoria";
    } else if (values.password.length < 6) {
      errors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (!isLogin && !values.city) {
      errors.city = "Selecciona tu ciudad";
    }

    return errors;
  };

  const onSubmit = (values: IFormInput) => {
    console.log("Datos enviados:", values);
    router.push("/viewProfile");
  };

  return (
    <div className=" rounded md:container md:mx-auto  flex items-center justify-center ">
      <div className="w-full max-w-xl bg-stone-100 p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-semibold text-center text-foreground mb-6">
          {isLogin ? "Inicio de Sesión" : "Registro"}
        </h1>

        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={onSubmit}
        >
          {() => (
            <Form>
              {/* Campo de nombre solo en Registro */}
              {!isLogin && (
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-lg text-foreground mb-2"
                  >
                    Nombre:
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              )}

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-lg text-foreground mb-2"
                >
                  Correo Electrónico:
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Campo de contraseña */}
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-lg text-foreground mb-2"
                >
                  Contraseña:
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Campo de ciudad solo en Registro */}
              {!isLogin && (
                <div className="mb-4">
                  <label
                    htmlFor="city"
                    className="block text-lg text-foreground mb-2"
                  >
                    Ciudad:
                  </label>
                  <Field
                    as="select"
                    id="city"
                    name="city"
                    className="w-full text-gray-700 px-4 py-5 mb-10 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Selecciona tu ciudad</option>
                    {cities.map((city, index) => (
                      <option key={index} value={city}>
                        {city}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="city"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 my-5 mb-10 bg-amber-400 text-gray-600 font-semibold rounded-md hover:bg-primary/80 transition duration-200"
              >
                {isLogin ? "Iniciar Sesión" : "Registrarse"}
              </button>

              {/* Enlace para alternar entre login y registro */}
              <div className="flex  justify-between text-center mt-4">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-gray-700 underline"
                >
                  {isLogin
                    ? "¿No tienes cuenta? Regístrate"
                    : "¿Ya tienes cuenta? Inicia sesión"}
                </button>
                <button type="button" className="text-gray-700 underline">
                  {isLogin ? " ¿Olvido su contraseña ?" : null}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FormAuth;
