const API_URL = "http://127.0.0.1:5000/api";

// OBTENER MÉTRICAS DEL DASHBOARD SEGÚN EL ROL (ADMIN O EMPLEADO)
export const obtenerMetricasDashboard = async (rol) => {
  try {
    const token = localStorage.getItem('token');
    // Si es rol 1 va a /admin/dashboard, si es rol 2 va a /empleado/dashboard
    const endpoint = rol === '1' ? 'admin/dashboard' : 'empleado/dashboard';
    
    const respuesta = await fetch(`${API_URL}/${endpoint}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      }
    });

    const data = await respuesta.json();
    if (!respuesta.ok) throw new Error(data.error || "Error al obtener métricas del dashboard");
    return data;
  } catch (error) {
    console.error("Error en obtenerMetricasDashboard:", error);
    throw error;
  }
};