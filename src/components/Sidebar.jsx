import React from 'react';
import { useNavigate } from 'react-router-dom';


const Sidebar = ({ cambiarVista , vistaActual}) => {
  const navigate = useNavigate();
  const nombreUsuario = localStorage.getItem('usuario_nombre') || 'Usuario';
  const inicial = nombreUsuario.charAt(0).toUpperCase();

  const cerrarSesion = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
  };

  // 2. Función inteligente para pintar el botón activo de negro y los demás de gris
  const obtenerEstilo = (nombreVista) => {
    return {
      textDecoration: 'none',
      color: vistaActual === nombreVista ? '#000' : '#6c757d',
      fontWeight: vistaActual === nombreVista ? 'bold' : 'normal',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      cursor: 'pointer' // Cambiamos la flecha por la manito de clic
    };
  };


return (
    <div style={{ 
      width: '260px', height: '100vh', backgroundColor: '#ffffff', 
      borderRight: '1px solid #eaeaea', display: 'flex', flexDirection: 'column', 
      padding: '20px', position: 'fixed', top: 0, left: 0
    }}>
      <h6 className="mb-4 text-muted" style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase' }}>
        Mi Menú
      </h6>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0, flexGrow: 1 }}>
        
        {/* 3. Reemplazamos los <Link> por <span> con eventos onClick */}
        <li style={{ marginBottom: '20px' }}>
          <span onClick={() => cambiarVista('resumen')} style={obtenerEstilo('resumen')}>
            🪟 Dashboard
          </span>
        </li>
        <li style={{ marginBottom: '20px' }}>
          <span onClick={() => cambiarVista('rutinas')} style={obtenerEstilo('rutinas')}>
            🏷️ Mi Rutina
          </span>
        </li>
        <li style={{ marginBottom: '20px' }}>
          <span onClick={() => cambiarVista('progreso')} style={obtenerEstilo('progreso')}>
            📦 Mi Progreso
          </span>
        </li>
        <li style={{ marginBottom: '20px' }}>
          <span onClick={() => cambiarVista('asistencia')} style={obtenerEstilo('asistencia')}>
            🚚 Mi Asistencia
          </span>
        </li>
        <li style={{ marginBottom: '20px' }}>
          <span onClick={() => cambiarVista('membresia')} style={obtenerEstilo('membresia')}>
            👥 Mi Membresía
          </span>
        </li>
        <li style={{ marginBottom: '20px' }}>
          <span onClick={() => cambiarVista('perfil')} style={obtenerEstilo('perfil')}>
            ⚙️ Mi Perfil
          </span>
        </li>
      </ul>

      {/* Sección inferior del usuario (Se mantiene intacta) */}
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