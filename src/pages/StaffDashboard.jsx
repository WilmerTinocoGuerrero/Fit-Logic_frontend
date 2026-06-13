import React, { useState, useEffect } from 'react';
import { apiFetch } from '../services/api';
import { FeedbackLabel } from '../components/FeedbackLabel';
import './StaffDashboard.css'; // 🚀 Carga del diseño corregido sin desbordes

export const StaffDashboard = () => {
  // --- ESTADO ÚNICO PARA EL FORMULARIO DE CLIENTES ---
  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    peso: '',
    altura: '',
    username: '',
    password: '',
    tipoMembresia: 'Plan Intermedio'
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', type: 'success' });
  const [staffNombre, setStaffNombre] = useState('Diego');

  useEffect(() => {
    const sesion = localStorage.getItem('usuario_fitlogic');
    if (!sesion) { window.location.href = '/login'; return; }

    const usuarioLogueado = JSON.parse(sesion);
    if (!usuarioLogueado.rol.toLowerCase().includes('empleado') && !usuarioLogueado.rol.toLowerCase().includes('admin')) {
      window.location.href = '/login';
      return;
    }
    
    if (usuarioLogueado.nombre) {
      setStaffNombre(usuarioLogueado.nombre.split(' ')[0]);
    }
  }, []);

  // --- CONTROLADOR: INSCRIBIR CLIENTE Y MATRÍCULA ---
  const handleInscribirCliente = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Petición modular hacia tu Blueprint de Flask
      const res = await apiFetch('/empleado/registrar_cliente', {
        method: 'POST',
        body: JSON.stringify({
          nombre: formData.nombre.trim(),
          edad: parseInt(formData.edad),
          peso: parseFloat(formData.peso),
          altura: parseInt(formData.altura),
          username: formData.username.trim(),
          password: formData.password,
          tipo_membresia: formData.tipoMembresia
        })
      });

      setFeedback({ message: res.mensaje || '🎉 Alumno y membresía activados con éxito.', type: 'success' });
      
      // Limpiamos el formulario para el siguiente cliente en la fila
      setFormData({
        nombre: '',
        edad: '',
        peso: '',
        altura: '',
        username: '',
        password: '',
        tipoMembresia: 'Plan Intermedio'
      });

    } catch (err) {
      setFeedback({ message: err.message || '❌ Error al procesar la inscripción.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="staff-container">
      
      {/* ================= PANEL PERFIL STAFF (SIDEBAR) ================= */}
      <aside className="staff-sidebar">
        <div className="staff-avatar">👤</div>
        <h2 className="staff-user-name">{staffNombre}</h2>
        <span className="staff-badge">Atendiendo: Staff</span>
        
        <div className="sidebar-info-row">Módulo: <strong>Inscripciones / Caja</strong></div>
        <div className="sidebar-info-row">Sede: <strong>Cerro Blanco</strong></div>
        <div className="sidebar-info-row">Conexión: <strong>Estable (Cloud)</strong></div>
        
        <button onClick={() => { localStorage.removeItem('usuario_fitlogic'); window.location.href = '/login'; }} className="btn-smart btn-staff-logout">
          Cerrar Sesión
        </button>
      </aside>

      {/* ================= MÓDULO DE TRABAJO PRINCIPAL ================= */}
      <main className="staff-main-panel">
        
        <div className="smart-card staff-card-form">
          <h1>PANEL DE TRABAJO</h1>
          <p class="subtitulo" style={{ textAlign: 'left', marginBottom: '20px' }}>Inscripción de nuevos alumnos e inicio automático de membresías.</p>

          <FeedbackLabel message={feedback.message} type={feedback.type} onClose={() => setFeedback({ message: '', type: 'success' })} />

          <form onSubmit={handleInscribirCliente}>
            
            {/* Campo 1: Nombre */}
            <div className="grupo-campo" style={{ marginBottom: '15px' }}>
              <label htmlFor="reg_nombre">Nombre Completo del Cliente:</label>
              <input 
                type="text" 
                id="reg_nombre" 
                placeholder="Ej. Carlos Mendoza" 
                required 
                value={formData.nombre}
                onChange={e => setFormData({...formData, nombre: e.target.value})}
                disabled={loading}
              />
            </div>

            {/* 🛡️ FILA BIOMÉTRICA CORREGIDA: 3 Columnas exactas sin desbordes de Altura */}
            <div className="grid-biometrics-3col">
              <div className="grupo-campo">
                <label htmlFor="reg_edad">Edad:</label>
                <input 
                  type="number" 
                  id="reg_edad" 
                  placeholder="25" 
                  required 
                  value={formData.edad}
                  onChange={e => setFormData({...formData, edad: e.target.value})}
                  disabled={loading}
                />
              </div>
              <div className="grupo-campo">
                <label htmlFor="reg_peso">Peso (kg):</label>
                <input 
                  type="number" 
                  step="0.1" 
                  id="reg_peso" 
                  placeholder="70.5" 
                  required 
                  value={formData.peso}
                  onChange={e => setFormData({...formData, peso: e.target.value})}
                  disabled={loading}
                />
              </div>
              <div className="grupo-campo">
                <label htmlFor="reg_altura">Altura (cm):</label>
                <input 
                  type="number" 
                  id="reg_altura" 
                  placeholder="172" 
                  required 
                  value={formData.altura}
                  onChange={e => setFormData({...formData, altura: e.target.value})}
                  disabled={loading}
                />
              </div>
            </div>

            <hr className="staff-divider" />

            {/* Fila 3: Credenciales del nuevo Alumno */}
            <div className="fila-campos" style={{ marginBottom: '15px' }}>
              <div className="grupo-campo">
                <label htmlFor="reg_username">Usuario Web asignado:</label>
                <input 
                  type="text" 
                  id="reg_username" 
                  placeholder="Ej. carlitos99" 
                  required 
                  value={formData.username}
                  onChange={e => setFormData({...formData, username: e.target.value})}
                  disabled={loading}
                />
              </div>
              <div className="grupo-campo">
                <label htmlFor="reg_password">Contraseña inicial:</label>
                <input 
                  type="password" 
                  id="reg_password" 
                  placeholder="Ej. 1234" 
                  required 
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                  disabled={loading}
                />
              </div>
            </div>

            <hr className="staff-divider" />

            {/* Fila 4: Selección de Plan */}
            <div className="grupo-campo" style={{ marginBottom: '20px' }}>
              <label htmlFor="reg_tipo_membresia">Tipo de Plan Contratado:</label>
              <select 
                id="reg_tipo_membresia"
                value={formData.tipoMembresia}
                onChange={e => setFormData({...formData, tipoMembresia: e.target.value})}
                disabled={loading}
              >
                <option value="Plan Basico">Plan Básico  (Sin asistencia de rutina)</option>
                <option value="Plan Intermedio">Plan Intermedio  (Con rutina estándar)</option>
                <option value="Plan VIP">Plan VIP  (Con rutina personalizada y seguimiento)</option>
              </select>
            </div>

            <button 
              type="submit" 
              id="btn-registrar-completo" 
              className="btn-smart btn-staff-submit"
              disabled={loading}
            >
              {loading ? 'Sincronizando Matrícula en la Nube...' : 'REGISTRAR E INICIAR MEMBRESÍA 🚀'}
            </button>
          </form>
        </div>

      </main>
    </div>
  );
};