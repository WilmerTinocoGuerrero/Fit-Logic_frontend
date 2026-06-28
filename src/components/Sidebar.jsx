import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const nombreUsuario = localStorage.getItem('usuario_nombre') || 'Usuario';
  const inicial = nombreUsuario.charAt(0).toUpperCase();

  const cerrarSesion = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
  };

  return (
    <div style={{ 
      width: '260px', 
      height: '100vh', 
      backgroundColor: '#ffffff', 
      borderRight: '1px solid #eaeaea', 
      display: 'flex', 
      flexDirection: 'column', 
      padding: '20px',
      position: 'fixed', // Se queda fijo a la izquierda
      top: 0,
      left: 0
    }}>
      <h6 className="mb-4 text-muted" style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase' }}>
        Mi Menú
      </h6>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0, flexGrow: 1 }}>
        <li style={{ marginBottom: '20px' }}>
          <Link to="/dashboard" style={{ textDecoration: 'none', color: '#000', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
            🪟 Dashboard
          </Link>
        </li>
        <li style={{ marginBottom: '20px' }}>
          <Link to="#rutina" style={{ textDecoration: 'none', color: '#6c757d', display: 'flex', alignItems: 'center', gap: '10px' }}>
            🏷️ Mi Rutina
          </Link>
        </li>
        <li style={{ marginBottom: '20px' }}>
          <Link to="#progreso" style={{ textDecoration: 'none', color: '#6c757d', display: 'flex', alignItems: 'center', gap: '10px' }}>
            📦 Mi Progreso
          </Link>
        </li>
        <li style={{ marginBottom: '20px' }}>
          <Link to="#asistencia" style={{ textDecoration: 'none', color: '#6c757d', display: 'flex', alignItems: 'center', gap: '10px' }}>
            🚚 Mi Asistencia
          </Link>
        </li>
        <li style={{ marginBottom: '20px' }}>
          <Link to="#membresia" style={{ textDecoration: 'none', color: '#6c757d', display: 'flex', alignItems: 'center', gap: '10px' }}>
            👥 Mi Membresía
          </Link>
        </li>
        <li style={{ marginBottom: '20px' }}>
          <Link to="#perfil" style={{ textDecoration: 'none', color: '#6c757d', display: 'flex', alignItems: 'center', gap: '10px' }}>
            ⚙️ Mi Perfil
          </Link>
        </li>
      </ul>

      {/* Sección inferior del usuario */}
      <div style={{ borderTop: '1px solid #eaeaea', paddingTop: '20px', textAlign: 'center' }}>
        <div style={{ border: '1px solid #eaeaea', borderRadius: '30px', padding: '10px', marginBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <span style={{ backgroundColor: '#00c853', color: 'white', borderRadius: '50%', width: '25px', height: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>
            {inicial}
          </span>
          <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>Hola, {nombreUsuario.split(' ')[0]}!</span>
        </div>
        
        <button onClick={cerrarSesion} style={{ color: '#ff4d4d', border: 'none', background: 'transparent', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%' }}>
          🚪 Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Sidebar;