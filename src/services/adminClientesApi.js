const API_URL = "http://127.0.0.1:5000/api/admin";

// 1. OBTENER LISTA DE CLIENTES (GET)
export const obtenerClientesAdmin = async () => {
  try {
    const token = localStorage.getItem('token');
    
    const respuesta = await fetch(`${API_URL}/clientes`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      }
    });

    const data = await respuesta.json();
    if (!respuesta.ok) throw new Error(data.error || "Error al obtener clientes");
    return data; // Retorna el array de clientes
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    throw error;
  }
};

// 2. REGISTRAR CLIENTE (POST)
export const registrarClienteAdmin = async (clienteData) => {
  try {
    const token = localStorage.getItem('token');

    const respuesta = await fetch(`${API_URL}/clientes`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(clienteData),
    });

    const data = await respuesta.json();

    if(!respuesta.ok) {
        throw new Error(data.error || "Error al registrar cliente");
    }

    return data;
  } catch (error) {
    console.error("Error al registrar cliente:", error);
    throw error;
  }
};

// 3. EDITAR CLIENTE (PUT)
export const editarClienteAdmin = async (id_cliente, clienteData) => {
  try {
    const token = localStorage.getItem('token');
    const respuesta = await fetch(`${API_URL}/clientes/${id_cliente}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(clienteData),
    });

    const data = await respuesta.json();
    if (!respuesta.ok) throw new Error(data.error || "Error al editar cliente");
    return data;
  } catch (error) {
    console.error("Error al editar cliente:", error);
    throw error;
  }
};

// 4. ELIMINAR CLIENTE PERMANENTEMENTE (DELETE)
export const eliminarClienteAdmin = async (id_cliente) => {
  try {
    const token = localStorage.getItem('token');
    
    const respuesta = await fetch(`${API_URL}/clientes/${id_cliente}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      }
    });

    const data = await respuesta.json();
    if (!respuesta.ok) throw new Error(data.error || "Error al eliminar cliente");
    return data;
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    throw error;
  }
};