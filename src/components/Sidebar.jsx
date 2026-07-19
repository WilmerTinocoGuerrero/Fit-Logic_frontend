import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ cambiarVista, vistaActual, rol }) => {
  const navigate = useNavigate();
  const nombreUsuario = localStorage.getItem('usuario_nombre') || 'Usuario';
  const inicial = nombreUsuario.charAt(0).toUpperCase();

  const cerrarSesion = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
  };

  // Función inteligente para pintar el botón activo de negro y los demás de gris
  const obtenerEstilo = (nombreVista) => {
    return {
      textDecoration: 'none',
      color: vistaActual === nombreVista ? '#000' : '#6c757d',
      fontWeight: vistaActual === nombreVista ? 'bold' : 'normal',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      cursor: 'pointer' 
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
        
        {/* ======================================================== */}
        {/* 1. MENÚ PARA CLIENTES (rol === '3')                      */}
        {/* ======================================================== */}
        {rol === '3' && (
          <>
            <li style={{ marginBottom: '20px' }}>
              <span onClick={() => cambiarVista('resumen')} style={obtenerEstilo('resumen')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b2e202" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
                Dashboard
              </span>
            </li>
            <li style={{ marginBottom: '20px' }}>
              <span onClick={() => cambiarVista('rutinas')} style={obtenerEstilo('rutinas')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b2e202" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 22h6"/><path d="M8 2h8a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"/></svg>
                Mi Rutina
              </span>
            </li>
            <li style={{ marginBottom: '20px' }}>
              <span onClick={() => cambiarVista('progreso')} style={obtenerEstilo('progreso')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b2e202" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 16 4-4 4 4 6-6"/><path d="M17 6h4v4"/></svg>
                Mi Progreso
              </span>
            </li>
            <li style={{ marginBottom: '20px' }}>
              <span onClick={() => cambiarVista('asistencia')} style={obtenerEstilo('asistencia')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b2e202" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                Mi Asistencia
              </span>
            </li>
            <li style={{ marginBottom: '20px' }}>
              <span onClick={() => cambiarVista('membresia')} style={obtenerEstilo('membresia')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b2e202" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                Mi Membresía
              </span>
            </li>
            <li style={{ marginBottom: '20px' }}>
              <span onClick={() => cambiarVista('perfil')} style={obtenerEstilo('perfil')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b2e202" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                Mi Perfil
              </span>
            </li>
          </>
        )}

        {/* ======================================================== */}
        {/* 2. MENÚ PARA ADMIN (1) Y EMPLEADO (2)                    */}
        {/* ======================================================== */}
        {(rol === '1' || rol === '2') && (
          <>
            <li style={{ marginBottom: '20px' }}>
              <span onClick={() => cambiarVista('resumen')} style={obtenerEstilo('resumen')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b2e202" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
                Dashboard Operativo
              </span>
            </li>
            
            <li style={{ marginBottom: '20px' }}>
              <span onClick={() => cambiarVista('clientes')} style={obtenerEstilo('clientes')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b2e202" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                Clientes
              </span>
            </li>

            {/* OJO AQUÍ: Este botón solo aparece si el rol es exactamente '1' (ADMIN) */}
            {rol === '1' && (
              <li style={{ marginBottom: '20px' }}>
                <span onClick={() => cambiarVista('empleados')} style={obtenerEstilo('empleados')}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b2e202" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg>
                  Empleados
                </span>
              </li>
            )}

            <li style={{ marginBottom: '20px' }}>
              <span onClick={() => cambiarVista('rutinas')} style={obtenerEstilo('rutinas')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b2e202" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 22h6"/><path d="M8 2h8a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"/></svg>
                 Rutinas
              </span>
            </li>
            
            <li style={{ marginBottom: '20px' }}>
              <span onClick={() => cambiarVista('progreso')} style={obtenerEstilo('progreso')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b2e202" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 16 4-4 4 4 6-6"/><path d="M17 6h4v4"/></svg>
                 Progreso
              </span>
            </li>
            
            <li style={{ marginBottom: '20px' }}>
              <span onClick={() => cambiarVista('asistencia')} style={obtenerEstilo('asistencia')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b2e202" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                 Asistencias
              </span>
            </li>
            
            <li style={{ marginBottom: '20px' }}>
              <span onClick={() => cambiarVista('membresia')} style={obtenerEstilo('membresia')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b2e202" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                 Membresías
              </span>
            </li>
            
            <li style={{ marginBottom: '20px' }}>
              <span onClick={() => cambiarVista('pagos')} style={obtenerEstilo('pagos')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b2e202" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                 Pagos
              </span>
            </li>
          </>
        )}
        
      </ul>

      {/* Sección inferior del usuario (Se mantiene intacta) */}
      <div style={{ borderTop: '1px solid #eaeaea', paddingTop: '20px', textAlign: 'center' }}>
        <div style={{ border: '1px solid #eaeaea', borderRadius: '30px', padding: '10px', marginBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <span style={{ backgroundColor: '#b2e202', color: 'white', borderRadius: '50%', width: '25px', height: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>
            {inicial}
          </span>
          <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>Hola, {nombreUsuario.split(' ')[0]}!</span>
        </div>
        
        <button onClick={cerrarSesion} style={{ color: '#ff4d4d', border: 'none', background: 'transparent', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff4d4d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Sidebar;