// src/services/mockAuth.js

// Base de datos de credenciales simulada para desarrollo local
const USUARIOS_MOCK = [
  {
    username: '76123456',
    password: 'admin123',
    perfil: {
      id_usuario: 1,
      username: '76123456',
      rol: 'admin',
      nombre: 'Nick'
    }
  },
  {
    username: '76223344',
    password: 'diego123',
    perfil: {
      id_usuario: 2,
      username: '76223344',
      rol: 'empleado',
      nombre: 'Diego Staff'
    }
  },
  {
    username: '76556677',
    password: 'alumno123',
    perfil: {
      id_usuario: 3,
      username: '76556677',
      rol: 'cliente',
      nombre: 'Carlos Mendoza'
    }
  }
];

/**
 * Simula la petición de autenticación que haría el Backend de Flask
 */
export const loginSimulado = (username, password) => {
  return new Promise((resolve, reject) => {
    // Simulamos un retraso de red de 1 segundo
    setTimeout(() => {
      const usuarioEncontrado = USUARIOS_MOCK.find(
        (u) => u.username === username && u.password === password
      );

      if (usuarioEncontrado) {
        // Retorna los datos del perfil si coinciden las credenciales
        resolve(usuarioEncontrado.perfil);
      } else {
        // Lanza un error si no coinciden, tal como lo haría la API
        reject(new Error('❌ Credenciales incorrectas. Verifica tu DNI o contraseña.'));
      }
    }, 1000);
  });
};