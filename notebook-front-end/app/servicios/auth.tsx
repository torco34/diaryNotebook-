import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "esto no funciona";
console.log(API_URL, "La api");

interface ILoginResponse {
  user: string;
  token: string;
}

interface IRegisterResponse {
  user: string;
  token: string;
}

// Función para iniciar sesión
export const loginUser = async (
  username: string,
  password: string
): Promise<ILoginResponse> => {
  try {
    const response = await axios.post<ILoginResponse>(
      `${API_URL}/users/login`,
      {
        username,
        password,
      }
    );

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error de login: " + error.message);
    } else {
      throw new Error("Error de login: " + String(error));
    }
  }
};

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  city: string = ""
): Promise<IRegisterResponse> => {
  try {
    const response = await axios.post<IRegisterResponse>(
      `${API_URL}/users/register`,
      {
        name,
        email,
        password,
        city,
      }
    );
    console.log(API_URL, "Register API endpoint");
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error de registro: " + error.message);
    } else {
      throw new Error("Error de registro: " + String(error));
    }
  }
};

export const initialValues: {
  name: string;
  email: string;
  password: string;
  city?: string;
} = {
  name: "",
  email: "",
  password: "",
  city: "",
};
