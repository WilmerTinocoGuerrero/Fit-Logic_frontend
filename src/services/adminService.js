import { apiFetch } from './api';

export const adminService = {
  // Obtiene el conteo rápido de empleados contratados
  getEstadisticas: async () => {
    return await apiFetch('/admin/estadisticas');
  },

  // Descarga las listas de rutinas, empleados y clientes de la nube
  getTablasGlobales: async () => {
    return await apiFetch('/admin/tablas_globales');
  },

  // Inserta un nuevo empleado en la base de datos
  registrarEmpleado: async (empleadoData) => {
    return await apiFetch('/admin/registrar_empleado', {
      method: 'POST',
      body: JSON.stringify(empleadoData)
    });
  },

  // Crea una nueva rutina de entrenamiento
  crearRutina: async (rutinaData) => {
    return await apiFetch('/admin/rutinas', {
      method: 'POST',
      body: JSON.stringify(rutinaData)
    });
  },

  // Elimina permanentemente un registro (empleado o cliente) en cascada
  eliminarPersona: async (tipo, id) => {
    return await apiFetch(`/admin/personas/${tipo}/${id}`, {
      method: 'DELETE'
    });
  }
};