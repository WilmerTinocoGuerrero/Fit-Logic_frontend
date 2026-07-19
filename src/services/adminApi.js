const API_URL = "http://127.0.0.1:5000/api/admin";

export const registrarEmpleadoAdmin = async (empleadoData) => {
    try {
        //1. sacamos el "gafete" (token) de la memoria del navegador
        const token = localStorage.getItem('token');

        const respuesta = await fetch(`${API_URL}/empleados`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                // 2. adjuntamos el token en las cabeceras
                "Authorization": `Bearer ${token}`
            },
            // 3. Enviamos los datos del formulario
            body: JSON.stringify(empleadoData),
    });

    const data = await respuesta.json();

    if(!respuesta.ok) {
        throw new Error(data.error || "Error al registrar empleado");
    }

    return data;
  } catch (error) {
    console.error("Error en adminApi:", error);
    throw error;
  }
};


//  Función para traer la lista de empleados
// (GET) ---> (VER-LISTA DE EMPLEADOS EN TABLA (PANEL ADMIN)
export const obtenerEmpleadosAdmin = async () => {
  try {
    const token = localStorage.getItem('token');
    
    // Al ser método GET, no enviamos "body", solo las cabeceras con el token
    const respuesta = await fetch(`${API_URL}/empleados`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      }
    });

    const data = await respuesta.json();
    if (!respuesta.ok) throw new Error(data.error);
    return data; // Retorna el array de empleados
  } catch (error) {
    console.error("Error al obtener empleados:", error);
    throw error;
  }
};


// ELIMINAR EMPLEADO (PANEL ADMIN --> DELETE -EMPLEADO)
export const eliminarEmpleadoAdmin = async (id_empleado) => {
  try {
    const token = localStorage.getItem('token');
    
    const respuesta = await fetch(`${API_URL}/empleados/${id_empleado}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      }
    });

    const data = await respuesta.json();
    if (!respuesta.ok) throw new Error(data.error);
    return data;
  } catch (error) {
    console.error("Error al eliminar empleado:", error);
    throw error;
  }
};


// EDITAR EMPLEADO (PANEL ADMIN --> EDITAR -EMPLEADO)
export const editarEmpleadoAdmin = async (id_empleado, empleadoData) => {
  try {
    const token = localStorage.getItem('token');
    const respuesta = await fetch(`${API_URL}/empleados/${id_empleado}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(empleadoData),
    });

    const data = await respuesta.json();
    if (!respuesta.ok) throw new Error(data.error);
    return data;
  } catch (error) {
    console.error("Error al editar empleado:", error);
    throw error;
  }
};