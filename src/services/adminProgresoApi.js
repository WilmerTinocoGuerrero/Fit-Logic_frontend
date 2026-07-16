const API_URL = "http://127.0.0.1:5000/api/admin";

// 1. OBTENER TODO EL HISTORIAL DE PROGRESOS (GET)
export const obtenerProgresoAdmin = async () => {
  try {
    const token = localStorage.getItem('token');
    
    const respuesta = await fetch(`${API_URL}/progreso`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      }
    });

    const data = await respuesta.json();
    if (!respuesta.ok) throw new Error(data.error || "Error al obtener el historial de progresos");
    return data;
  } catch (error) {
    console.error("Error en obtenerProgresoAdmin:", error);
    throw error;
  }
};

// 2. REGISTRAR EL PROGRESO DE UN CLIENTE (POST)
export const registrarProgresoAdmin = async (progresoData) => {
  try {
    const token = localStorage.getItem('token');

    const respuesta = await fetch(`${API_URL}/progreso`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(progresoData),
    });

    const data = await respuesta.json();
    if (!respuesta.ok) throw new Error(data.error || "Error al registrar el progreso");
    return data;
  } catch (error) {
    console.error("Error en registrarProgresoAdmin:", error);
    throw error;
  }
};

// 3. EDITAR UN REGISTRO DE PROGRESO (PUT)
export const editarProgresoAdmin = async (id_progreso, progresoData) => {
  try {
    const token = localStorage.getItem('token');

    const respuesta = await fetch(`${API_URL}/progreso/${id_progreso}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(progresoData),
    });

    const data = await respuesta.json();
    if (!respuesta.ok) throw new Error(data.error || "Error al actualizar el progreso");
    return data;
  } catch (error) {
    console.error("Error en editarProgresoAdmin:", error);
    throw error;
  }
};