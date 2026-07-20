const API_URL = " https://fit-logic-backend.onrender.com/api/admin";

// 1. OBTENER TODAS LAS RUTINAS (GET)
export const obtenerRutinasAdmin = async () => {
  try {
    const token = localStorage.getItem('token');
    
    const respuesta = await fetch(`${API_URL}/rutinas`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      }
    });

    const data = await respuesta.json();
    if (!respuesta.ok) throw new Error(data.error || "Error al obtener las rutinas");
    return data; // Retorna la lista de rutinas
  } catch (error) {
    console.error("Error al obtener rutinas:", error);
    throw error;
  }
};

// 2. ASIGNAR UNA NUEVA RUTINA (POST)
export const registrarRutinaAdmin = async (rutinaData) => {
  try {
    const token = localStorage.getItem('token');

    const respuesta = await fetch(`${API_URL}/rutinas`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(rutinaData),
    });

    const data = await respuesta.json();

    if(!respuesta.ok) {
        throw new Error(data.error || "Error al registrar la rutina");
    }

    return data;
  } catch (error) {
    console.error("Error al registrar rutina:", error);
    throw error;
  }
};

// 3. EDITAR RUTINA EXISTENTE (PUT)
export const editarRutinaAdmin = async (id_rutina, rutinaData) => {
  try {
    const token = localStorage.getItem('token');
    const respuesta = await fetch(`${API_URL}/rutinas/${id_rutina}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(rutinaData),
    });

    const data = await respuesta.json();
    if (!respuesta.ok) throw new Error(data.error || "Error al editar la rutina");
    return data;
  } catch (error) {
    console.error("Error al editar rutina:", error);
    throw error;
  }
};

// 4. ELIMINAR RUTINA (DELETE)
export const eliminarRutinaAdmin = async (id_rutina) => {
  try {
    const token = localStorage.getItem('token');
    
    const respuesta = await fetch(`${API_URL}/rutinas/${id_rutina}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      }
    });

    const data = await respuesta.json();
    if (!respuesta.ok) throw new Error(data.error || "Error al eliminar la rutina");
    return data;
  } catch (error) {
    console.error("Error al eliminar rutina:", error);
    throw error;
  }
};