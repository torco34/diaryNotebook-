"use client";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { BaseButton } from "../shared/BaseButton";
import { BaseFormSelect } from "../shared/BaseFormSelect";
import { BaseFormText } from "../shared/BaseFormText";
import { IFormAuth } from "./ts/FormType";

const CITIES = [
  "Bogotá",
  "Medellín",
  "Cali",
  "Barranquilla",
  "Cartagena",
  "Bucaramanga",
  "Cúcuta",
  "Pereira",
  "Santa Marta",
  "Manizales",
  "Ibagué",
  "Soledad",
  "Neiva",
  "Villavicencio",
  "Armenia",
];

const FormAuth = () => {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const handleForgotPassword = () => {
    router.push("/viewProfile");
  };

  const initialValues: IFormAuth = {
    name: "",
    email: "",
    password: "",
    city: "",
  };

  const validate = (values: IFormAuth) => {
    const errors: Partial<IFormAuth> = {};

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

  const onSubmit = async (
    values: IFormAuth,
    {
      setStatus,
    }: { setStatus: (status: { success?: string; error?: string }) => void }
  ) => {
    try {
      if (isLogin) {
        await login(values.email, values.password);
        setStatus({ success: "Inicio de sesión exitoso. Redirigiendo..." });
        setTimeout(() => router.push("/viewProfile"), 1500);
      } else {
        await register(values.name, values.email, values.password, values.city);
        setStatus({ success: "Registro exitoso. Redirigiendo..." });
        setTimeout(() => router.push("/viewProfile"), 1500);
      }
    } catch (error) {
      console.error("Error de autenticación:", error);
      setStatus({
        error: "Hubo un error en la autenticación. Inténtalo de nuevo.",
      });
    }
  };

  return (
    <div className="rounded md:container md:mx-auto flex items-center justify-center">
      <div className="w-full max-w-xl bg-gray-100 text-gray-800 p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-semibold text-orange-500 text-center mb-6">
          {isLogin ? "Inicio de Sesión" : "Registro"}
        </h1>

        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={onSubmit}
        >
          {({ status }) => (
            <Form>
              {status?.error && (
                <div className="mb-4 p-3 rounded bg-red-100 text-red-600">
                  {status.error}
                </div>
              )}
              {status?.success && (
                <div className="mb-4 p-3 rounded bg-green-700 text-gray-100">
                  {status.success}
                </div>
              )}

              {!isLogin && (
                <BaseFormText
                  name="name"
                  label="Nombre:"
                  placeholder="Ingresa tu nombre"
                />
              )}

              <BaseFormText
                name="email"
                label="Correo Electrónico:"
                type="email"
                placeholder="Ingresa tu correo"
              />

              <BaseFormText
                name="password"
                label="Contraseña:"
                type="password"
                placeholder="Ingresa tu contraseña"
              />

              {!isLogin && (
                <BaseFormSelect
                  name="city"
                  label="Ciudad:"
                  options={CITIES}
                  placeholder="Selecciona tu ciudad"
                />
              )}

              <BaseButton
                label={isLogin ? "Iniciar Sesión" : "Registrarse"}
                variant="primary"
                type="submit"
                className="w-full py-3 text-gray-100 my-5 mb-10"
              />

              <div className="flex justify-between text-center mt-4">
                <BaseButton
                  label={
                    isLogin
                      ? "¿No tienes cuenta? Regístrate"
                      : "¿Ya tienes cuenta? Inicia sesión"
                  }
                  variant="secondary"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-gray-100"
                />
                {isLogin && (
                  <BaseButton
                    label="¿Olvidaste tu contraseña?"
                    variant="danger"
                    onClick={handleForgotPassword}
                    className="text-orange-500 hover:text-orange-300"
                  />
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FormAuth;
