import { apiFetch } from './api';

export const authService = {
  // Dispara la validación de credenciales
  login: async (username, password) => {
    return await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });
  },

  // Limpia el estado local del navegador
  logout: () => {
    localStorage.removeItem('usuario_fitlogic');
    window.location.href = '/login';
  }
};