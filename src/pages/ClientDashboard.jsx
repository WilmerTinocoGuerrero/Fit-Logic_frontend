import React, { useState, useEffect } from 'react';
import { apiFetch } from '../services/api';
import { FeedbackLabel } from '../components/FeedbackLabel';
import './ClientDashboard.css'; // 🚀 Importación del CSS dedicado

export const ClientDashboard = () => {
  const [alumno, setAlumno] = useState(null);
  const [membresia, setMembresia] = useState(null);
  const [rutina, setRutina] = useState(null);
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState({ message: '', type: 'success' });

  useEffect(() => {
    const sesion = localStorage.getItem('usuario_fitlogic');
    if (!sesion) {
      window.location.href = '/login';
      return;
    }
    const usuarioLogueado = JSON.parse(sesion);
    cargarDatosAlumno(usuarioLogueado.id_usuario);
  }, []);

  const cargarDatosAlumno = async (idUsuario) => {
    try {
      setLoading(true);
      const data = await apiFetch(`/cliente/perfil/${idUsuario}`);
      setAlumno(data.cliente);
      setMembresia(data.membresia);
      setRutina(data.rutina);
      setPagos(data.pagos || []);
    } catch (error) {
      setFeedback({ message: error.message || 'Error al conectar con Neon Cloud DB.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-wrapper">
        <div className="spinner"></div>
        <p>Cargando tu ecosistema de entrenamiento Fit-Logic...</p>
      </div>
    );
  }

  const esActivo = membresia?.estado?.toLowerCase() === 'activo';

  return (
    <div className="dashboard-wrapper">
      
      {/* SIDEBAR DE IDENTIDAD */}
      <aside className="client-sidebar">
        <div className="client-avatar">💪</div>
        <h2 className="client-name">{alumno?.nombre || 'Alumno'}</h2>
        <span className={`status-badge ${esActivo ? 'active' : 'inactive'}`}>
          ● Membresía {membresia?.estado || 'Inactiva'}
        </span>

        <div className="info-block">
          <div className="info-item">Edad: <strong>{alumno?.edad} años</strong></div>
          <div style={{ textAling: 'left' }} className="info-item">Peso: <strong>{alumno?.peso} kg</strong></div>
          <div className="info-item">Altura: <strong>{alumno?.altura} cm</strong></div>
          <div className="info-item">Usuario: <strong>@{JSON.parse(localStorage.getItem('usuario_fitlogic'))?.username}</strong></div>
        </div>

        <button 
          onClick={() => { localStorage.removeItem('usuario_fitlogic'); window.location.href = '/login'; }} 
          className="btn-smart btn-logout"
        >
          Salir de la App
        </button>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="client-main">
        <header>
          <h1 style={{ margin: 0, fontWeight: '800' }}>¡HOLA, {alumno?.nombre?.split(' ')[0].toUpperCase()}!</h1>
          <p style={{ color: 'var(--text-muted)', margin: '5px 0 20px' }}>Tu plan actual e historial de entrenamiento en Cerro Blanco.</p>
        </header>

        <FeedbackLabel 
          message={feedback.message} 
          type={feedback.type} 
          onClose={() => setFeedback({ message: '', type: 'success' })} 
        />

        {!esActivo && (
          <div className="smart-card lock-card">
            <h3>🔒 ACCESO RESTRINGIDO A SALA</h3>
            <p>Tu pase **{membresia?.tipo || 'Ninguno'}** venció. Por favor, acércate a la recepción con Diego para renovar tu matrícula.</p>
          </div>
        )}

        <div className="client-grid">
          
          {/* SECCIÓN DE RUTINA */}
          <section className="smart-card col-span-2">
            <div className="routine-header">
              <h2 style={{ margin: 0, color: 'var(--brand-yellow)' }}>📋 MI PLAN DE ENTRENAMIENTO</h2>
              <span className="badge-nivel">{rutina?.nivel || 'General'}</span>
            </div>
            
            {rutina ? (
              <div style={{ marginTop: '20px' }}>
                <p style={{ fontSize: '15px' }}>⏱️ <strong>Duración estimada:</strong> {rutina.duracion}</p>
                <h4 style={{ color: 'var(--text-muted)', marginBottom: '10px' }}>Ejercicios asignados para hoy:</h4>
                <div className="ejercicios-grid">
                  {rutina.ejercicios?.split('\n').map((ejercicio, i) => (
                    <div key={i} className="ejercicio-item">
                      <span style={{ color: 'var(--brand-yellow)', marginRight: '8px' }}>⚡</span>
                      {ejercicio}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)', marginTop: '15px' }}>No tienes una rutina asignada a tu objetivo físico aún.</p>
            )}
          </section>

          {/* TARJETA DETALLE PLAN */}
          <section className="smart-card">
            <h3 style={{ margin: '0 0 15px 0' }}>💳 DETALLE DEL PLAN</h3>
            <p style={{ fontSize: '20px', fontWeight: '700', color: 'var(--brand-yellow)', margin: '5px 0' }}>
              {membresia?.tipo || 'Sin Plan'}
            </p>
            <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '15px' }}>
              <p style={{ margin: '5px 0' }}>Inicio: <strong>{membresia?.fecha_inicio}</strong></p>
              <p style={{ margin: '5px 0' }}>Término: <strong>{membresia?.fecha_fin}</strong></p>
            </div>
          </section>

          {/* HISTORIAL DE PAGOS */}
          <section className="smart-card col-span-3">
            <h3 style={{ margin: '0 0 15px 0' }}>💵 HISTORIAL DE TRANSACCIONES</h3>
            <div style={{ overflowX: 'auto' }}>
              <table className="payment-table">
                <thead>
                  <tr>
                    <th>ID Recibo</th>
                    <th>Monto Canc.</th>
                    <th>Fecha Pago</th>
                    <th>Método</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {pagos.length > 0 ? pagos.map((p, index) => (
                    <tr key={index}>
                      <td>#00{p.id_pago}</td>
                      <td style={{ color: 'var(--brand-green)', fontWeight: '700' }}>S/. {p.monto}</td>
                      <td>{p.fecha_pago}</td>
                      <td>💳 {p.metodo_pago}</td>
                      <td><span className="badge-success">Aprobado</span></td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                        No se registran transacciones de pago en el sistema.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};