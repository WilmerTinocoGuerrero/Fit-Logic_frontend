const API_URL = " https://fit-logic-backend.onrender.com/api/admin";

// 1. OBTENER HISTORIAL DE PAGOS (GET)
export const obtenerPagosAdmin = async () => {
  try {
    const token = localStorage.getItem('token');
    
    const respuesta = await fetch(`${API_URL}/pagos`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      }
    });

    const data = await respuesta.json();
    if (!respuesta.ok) throw new Error(data.error || "Error al obtener historial de pagos");
    return data;
  } catch (error) {
    console.error("Error al obtener pagos:", error);
    throw error;
  }
};

// 2. REGISTRAR UN NUEVO PAGO (POST)
export const registrarPagoAdmin = async (pagoData) => {
  try {
    const token = localStorage.getItem('token');

    const respuesta = await fetch(`${API_URL}/pagos`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(pagoData),
    });

    const data = await respuesta.json();
    if (!respuesta.ok) throw new Error(data.error || "Error al registrar pago");
    return data;
  } catch (error) {
    console.error("Error al registrar pago:", error);
    throw error;
  }
};

// 3. ACTUALIZAR UN PAGO EXISTENTE (PUT)
export const editarPagoAdmin = async (id_pago, pagoData) => {
  try {
    const token = localStorage.getItem('token');

    const respuesta = await fetch(`${API_URL}/pagos/${id_pago}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(pagoData),
    });

    const data = await respuesta.json();
    if (!respuesta.ok) throw new Error(data.error || "Error al actualizar pago");
    return data;
  } catch (error) {
    console.error("Error al actualizar pago:", error);
    throw error;
  }
};