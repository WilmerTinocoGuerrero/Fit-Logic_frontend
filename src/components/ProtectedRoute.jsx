import React from 'react';

export const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  // 1. Recuperamos la sesión actual de la caché
  const sesion = localStorage.getItem('usuario_fitlogic');

  // Si no hay sesión iniciada, rebota de inmediato al Login
  if (!sesion) {
    window.location.href = '/login';
    return null;
  }

  const usuarioLogueado = JSON.parse(sesion);
  const rolUsuario = usuarioLogueado.rol?.toLowerCase();

  // 2. Verificamos si el rol del usuario de la BD tiene permitido ver esta pantalla
  const tieneAcceso = allowedRoles.some(rolPermitido => 
    rolUsuario.includes(rolPermitido.toLowerCase())
  );

  if (!tieneAcceso) {
    // Si el rol no coincide (ej: un cliente queriendo entrar a /admin), lo mandamos a un entorno seguro
    return (
      <div style={{ textAlign: 'center', marginTop: '100px', color: '#fff' }}>
        <h2>⛔ ACCESO DENEGADO</h2>
        <p>Tus credenciales no cuentan con los privilegios criptográficos para esta sección.</p>
        <button onClick={() => window.location.href = '/'} className="btn-smart" style={{ marginTop: '20px' }}>
          Volver a un lugar seguro
        </button>
      </div>
    );
  }

  // Si pasa todas las validaciones de seguridad, renderiza la vista solicitada
  return children;
};