// src/services/clienteApi.js
const API_URL = " https://fit-logic-backend.onrender.com/api";

// ----------- ACTUALIZAR PERFIL FISICO
export const actualizarPerfil = async (id_usuario, peso, altura, edad) => {
  try {
    const respuesta = await fetch(`${API_URL}/actualizar_perfil`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_usuario, peso, altura, edad })
    });
    const data = await respuesta.json();
    if (!respuesta.ok) throw new Error(data.error || "Error al actualizar perfil");
    return data;
  } catch (error) {   
    console.error("Error de conexión:", error);
    throw error;
  }
};

// ----------- OBTENER RESUMEN PANEL CLIENTE
export const obtenerResumenCliente = async (id_usuario) => {
  try {
    const respuesta = await fetch(`${API_URL}/resumen_cliente/${id_usuario}`, {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
    });
    const data = await respuesta.json();
    if (!respuesta.ok) throw new Error(data.error || "Error al obtener resumen");
    return data;
  } catch (error) {
    console.error("Error de conexión:", error);
    throw error;
  }
};

// ----------- OBTENER RUTINAS
export const obtenerRutinaCliente = async (id_usuario) => {
  try {
    const respuesta = await fetch(`${API_URL}/mi_rutina/${id_usuario}`, {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
    });
    const data = await respuesta.json();
    if (!respuesta.ok) throw new Error(data.error || "Error al obtener rutinas");
    return data;
  } catch (error) {
    console.error("Error de conexión:", error);
    throw error;
  }
};

// ----------- OBTENER PROGRESO
export const obtenerProgresoCliente = async (id_usuario) => {
  try {
    const respuesta = await fetch(`${API_URL}/mi_progreso/${id_usuario}`, {
      method: 'GET',
      headers: { "Content-Type": "application/json" }
    });
    const data = await respuesta.json();
    if (!respuesta.ok) throw new Error(data.error);
    return data;
  } catch (error) {
    console.error("Error de conexión:", error);
    throw error;
  }
};

// ----------- OBTENER ASISTENCIAS
export const obtenerAsistenciaCliente = async (id_usuario) => {
  try {
    const respuesta = await fetch(`${API_URL}/mi_asistencia/${id_usuario}`, {
      method: 'GET',
      headers: { "Content-Type": "application/json" }
    });
    const data = await respuesta.json();
    if (!respuesta.ok) throw new Error(data.error);
    return data;
  } catch (error) {
    console.error("Error de conexión:", error);
    throw error;
  }
};

// ----------- OBTENER MEMBRESIA
export const obtenerMembresiaCliente = async (id_usuario) => {
  try {
    const respuesta = await fetch(`${API_URL}/mi_membresia/${id_usuario}`, {
      method: 'GET',
      headers: { "Content-Type": "application/json" }
    });
    const data = await respuesta.json();
    if (!respuesta.ok) throw new Error(data.error);
    return data;
  } catch (error) {
    console.error("Error de conexión:", error);
    throw error;
  }
};

// ----------- OBTENER PERFIL
export const obtenerPerfilCliente = async (id_usuario) => {
  try {
    const respuesta = await fetch(`${API_URL}/mi_perfil/${id_usuario}`, {
      method: 'GET',
      headers: { "Content-Type": "application/json"}
    });
    const data = await respuesta.json();
    if (!respuesta.ok) throw new Error(data.error);
    return data;
  } catch (error) {
    console.error("Error de conexión:", error);
    throw error;
  }
};