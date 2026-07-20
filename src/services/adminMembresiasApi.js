const API_URL = " https://fit-logic-backend.onrender.com/api/admin";

// 1. TRAER TODAS LAS MEMBRESÍAS DE LOS CLIENTES (GET)
export const obtenerMembresiasAdmin = async () => {
  try {
    const token = localStorage.getItem('token');
    
    const respuesta = await fetch(`${API_URL}/membresias`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      }
    });

    const data = await respuesta.json();
    if (!respuesta.ok) throw new Error(data.error || "Error al cargar membresías");
    return data; // Retorna la lista de membresías
  } catch (error) {
    console.error("Error al obtener membresías:", error);
    throw error;
  }
};

// 2. ACTUALIZAR MEMBRESÍA DE UN CLIENTE (PUT)
export const editarMembresiaAdmin = async (id_membresia, membresiaData) => {
  try {
    const token = localStorage.getItem('token');
    
    const respuesta = await fetch(`${API_URL}/membresias/${id_membresia}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(membresiaData),
    });

    const data = await respuesta.json();
    if (!respuesta.ok) throw new Error(data.error || "Error al actualizar membresía");
    return data;
  } catch (error) {
    console.error("Error al actualizar membresía:", error);
    throw error;
  }
};