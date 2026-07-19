const API_URL = "http://127.0.0.1:5000/api/admin"; // <-- Volvemos a /api/admin

// 1. OBTENER HISTORIAL COMPLETO DE ASISTENCIAS (GET)
export const obtenerAsistenciasAdmin = async () => {
  try {
    const token = localStorage.getItem('token');
    
    const respuesta = await fetch(`${API_URL}/asistencias`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      }
    });

    const data = await respuesta.json();
    if (!respuesta.ok) throw new Error(data.error || "Error al obtener historial de asistencias");
    return data; 
  } catch (error) {
    console.error("Error al obtener asistencias:", error);
    throw error;
  }
};

// 2. REGISTRAR ASISTENCIA MANUAL DE UN CLIENTE (POST)
export const registrarAsistenciaAdmin = async (asistenciaData) => {
  try {
    const token = localStorage.getItem('token');

    const respuesta = await fetch(`${API_URL}/asistencias`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(asistenciaData),
    });

    const data = await respuesta.json();

    if (!respuesta.ok) {
      throw new Error(data.error || "Error al registrar asistencia");
    }

    return data; 
  } catch (error) {
    console.error("Error al registrar asistencia:", error);
    throw error;
  }
};