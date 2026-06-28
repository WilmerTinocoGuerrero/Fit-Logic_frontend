import axios from "axios";

// Ruta donde está corriendo el servidor Flask
const API_URL = "http://127.0.0.1:5000/api";

// ------ (API / LOGIN || petición )
export const loginUsuario = async (correo, password) => {
  try {
    const respuesta = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correo, password }),
    });

    // Convertimos la respuesta del servidor a JSON
    const data = await respuesta.json();

    // Si el servidor devuelve un error (CODIGO 400 / 401)
    if (!respuesta.ok) {
      throw new Error(data.error || "Error al iniciar sesión");
    }

    return data; // <-- Retornar el mensaje, el usuario y el TOKEN vip
  } catch (error) {
    console.error("Error de conexión:", error);
    throw error;
  }
};

   // ------ (API / REGISTRAR || petición )

  export const registrarUsuario = async (nombre, dni, correo, password) => {
    try {
      const respuesta = await fetch(`${API_URL}/registro`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Empaquetamos los 4 datos que Flask está esperando
        body: JSON.stringify({ nombre, dni, correo, password }),
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(data.error || "Error al registrar la cuenta");
      }

      return data; // Retorna el mensaje de éxito
    } catch (error) {
      console.error("Error de conexión:", error);
      throw error;
    }
  };
