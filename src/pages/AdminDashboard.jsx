import React, { useState, useEffect } from 'react';
import { apiFetch } from '../services/api';
import { FeedbackLabel } from '../components/FeedbackLabel';
import './AdminDashboard.css'; // 🚀 Carga del diseño desacoplado

export const AdminDashboard = () => {
  // --- ESTADOS DE DATOS DE LA BD ---
  const [totalEmpleados, setTotalEmpleados] = useState(0);
  const [rutinas, setRutinas] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [feedback, setFeedback] = useState({ message: '', type: 'success' });

  // --- ESTADOS DE LOS FORMULARIOS ---
  const [rutinaForm, setRutinaForm] = useState({ id: '', nivel: 'Intermedio', duracion: '', ejercicios: '' });
  const [empleadoForm, setEmpleadoForm] = useState({ nombre: '', correo: '', especialidad: '', username: '', password: '' });
  const [modPersonaForm, setModPersonaForm] = useState({ tipo: 'empleado', id: '', nombre: '', extra: '' });

  useEffect(() => {
    const sesion = localStorage.getItem('usuario_fitlogic');
    if (!sesion) { window.location.href = '/login'; return; }
    
    const usuario = JSON.parse(sesion);
    if (!usuario.rol.toLowerCase().includes('admin')) { window.location.href = '/login'; return; }

    initDashboard();
  }, []);

  const initDashboard = async () => {
    try {
      const stats = await apiFetch('/admin/estadisticas');
      setTotalEmpleados(stats.total_empleados);

      const tablas = await apiFetch('/admin/tablas_globales');
      setRutinas(tablas.rutinas || []);
      setEmpleados(tablas.empleados || []);
      setClientes(tablas.clientes || []);
    } catch (err) {
      setFeedback({ message: err.message || 'Error al sincronizar con Neon Cloud DB.', type: 'error' });
    }
  };

  // --- CONTROLADOR: REGISTRAR STAFF (TABLA USUARIO + EMPLEADO) ---
  const handleRegistrarEmpleado = async (e) => {
    e.preventDefault();
    try {
      const res = await apiFetch('/admin/registrar_empleado', {
        method: 'POST',
        body: JSON.stringify(empleadoForm)
      });
      setFeedback({ message: res.mensaje, type: 'success' });
      setEmpleadoForm({ nombre: '', correo: '', especialidad: '', username: '', password: '' });
      initDashboard();
    } catch (err) { setFeedback({ message: err.message, type: 'error' }); }
  };

  // --- CONTROLADORES: CRUD RUTINAS ---
  const handleCrearRutina = async () => {
    try {
      const res = await apiFetch('/admin/rutinas', {
        method: 'POST',
        body: JSON.stringify({ nivel: rutinaForm.nivel, duracion: rutinaForm.duracion, ejercicios: rutinaForm.ejercicios })
      });
      setFeedback({ message: res.mensaje, type: 'success' });
      setRutinaForm({ id: '', nivel: 'Intermedio', duracion: '', ejercicios: '' });
      initDashboard();
    } catch (err) { setFeedback({ message: err.message, type: 'error' }); }
  };

  // --- CONTROLADOR: BAJAS CRÍTICAS ---
  const handleEliminarPersona = async () => {
    if (!modPersonaForm.id) { setFeedback({ message: '⚠️ Digita un ID válido para proceder.', type: 'error' }); return; }
    if (!window.confirm(`¿Seguro de dar de baja a este ${modPersonaForm.tipo}? Se purgarán sus accesos en cascada.`)) return;

    try {
      const res = await apiFetch(`/admin/personas/${modPersonaForm.tipo}/${modPersonaForm.id}`, { method: 'DELETE' });
      setFeedback({ message: res.mensaje, type: 'success' });
      setModPersonaForm({ tipo: 'empleado', id: '', nombre: '', extra: '' });
      initDashboard();
    } catch (err) { setFeedback({ message: err.message, type: 'error' }); }
  };

  return (
    <div className="admin-container">
      
      {/* ================= SIDEBAR DE AUTENTICIDAD ================= */}
      <aside className="admin-sidebar">
        <div className="admin-avatar">🥦</div>
        <h2 className="admin-user-name">Nick</h2>
        <span className="admin-badge">Super Administrador</span>
        
        <div class="sidebar-meta-item">Privilegios: <strong>ROOT / Total</strong></div>
        <div class="sidebar-meta-item">Nube: <strong>Neon Cloud DB</strong></div>
        <div class="sidebar-meta-item">Sede: <strong>Puente Piedra</strong></div>
        
        <button onClick={() => { localStorage.removeItem('usuario_fitlogic'); window.location.href = '/login'; }} className="btn-smart btn-admin-logout">
          Cerrar Sesión
        </button>
      </aside>

      {/* ================= PANEL OPERATIVO CENTRAL ================= */}
      <main className="admin-main-panel">
        <header className="admin-header-title">
          <h1>CENTRO DE COMANDO GLOBAL</h1>
          <p style={{ color: 'var(--text-muted)', margin: '5px 0 0 0' }}>Gestión e infraestructura automatizada del gimnasio.</p>
        </header>

        <FeedbackLabel message={feedback.message} type={feedback.type} onClose={() => setFeedback({ message: '', type: 'success' })} />

        {/* MÉTRICAS EN MOSAICO */}
        <div className="metrics-row">
          <div className="smart-card metric-card-box">
            <h3>STAFF CONTRATADO</h3>
            <h2 className="metric-number">{totalEmpleados}</h2>
          </div>
          <div className="smart-card metric-card-box" style={{ left: 0 }}>
            <h3>CONEXIÓN REMOTA</h3>
            <h2 className="metric-number" style={{ color: 'var(--brand-green)', fontSize: '22px', marginTop: '18px' }}>● PostgreSQL Activo</h2>
          </div>
        </div>

        {/* CONTENEDOR DE OPERACIONES DIVIDIDAS */}
        <div className="forms-split-grid">
          
          {/* CONTROL DE RUTINAS */}
          <div className="smart-card">
            <h2>Gestionar Rutinas del Gimnasio 📋</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="grupo-campo" style={{ marginBottom: '15px' }}>
                <label>ID Rutina (Solo para Modificaciones):</label>
                <input type="number" placeholder="Ej. 1" value={rutinaForm.id} onChange={e => setRutinaForm({...rutinaForm, id: e.target.value})} />
              </div>
              <div className="fila-campos" style={{ marginBottom: '15px' }}>
                <div className="grupo-campo">
                  <label>Nivel:</label>
                  <select value={rutinaForm.nivel} onChange={e => setRutinaForm({...rutinaForm, nivel: e.target.value})}>
                    <option value="Principiante">Principiante</option>
                    <option value="Intermedio">Intermedio</option>
                    <option value="Avanzado">Avanzado</option>
                  </select>
                </div>
                <div className="grupo-campo">
                  <label>Duración:</label>
                  <input type="text" placeholder="Ej. 60 minutos" value={rutinaForm.duracion} onChange={e => setRutinaForm({...rutinaForm, duracion: e.target.value})} />
                </div>
              </div>
              <div className="grupo-campo" style={{ marginBottom: '15px' }}>
                <label>Ejercicios (Separados por saltos de línea):</label>
                <textarea rows="4" placeholder="Ej. Press Banca: 4x10" value={rutinaForm.ejercicios} onChange={e => setRutinaForm({...rutinaForm, ejercicios: e.target.value})}></textarea>
              </div>
              <div className="flex-btn-group">
                <button type="button" onClick={handleCrearRutina} className="btn-smart btn-flex-action" style={{ background: 'var(--brand-green)' }}>Crear</button>
              </div>
            </form>
          </div>

          {/* INSCRIPCIÓN DE STAFF */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="smart-card">
              <h2>Registrar Nuevo Empleado</h2>
              <form onSubmit={handleRegistrarEmpleado}>
                <div className="grupo-campo" style={{ marginBottom: '10px' }}>
                  <label>Nombre Completo:</label>
                  <input type="text" placeholder="Ej. Diego Staff" required value={empleadoForm.nombre} onChange={e => setEmpleadoForm({...empleadoForm, nombre: e.target.value})} />
                </div>
                <div className="grupo-campo" style={{ marginBottom: '10px' }}>
                  <label>Correo Electrónico:</label>
                  <input type="email" placeholder="diego@fitlogic.com" required value={empleadoForm.correo} onChange={e => setEmpleadoForm({...empleadoForm, correo: e.target.value})} />
                </div>
                <div className="grupo-campo" style={{ marginBottom: '10px' }}>
                  <label>Especialidad / Rol Técnico:</label>
                  <input type="text" placeholder="Ej. Instructor" required value={empleadoForm.especialidad} onChange={e => setEmpleadoForm({...empleadoForm, especialidad: e.target.value})} />
                </div>
                <div className="fila-campos" style={{ marginBottom: '10px' }}>
                  <div class="grupo-campo">
                    <label>Usuario (DNI):</label>
                    <input type="text" placeholder="Ej. 76123456" required value={empleadoForm.username} onChange={e => setEmpleadoForm({...empleadoForm, username: e.target.value})} />
                  </div>
                  <div class="grupo-campo">
                    <label>Contraseña:</label>
                    <input type="password" placeholder="••••••••" required value={empleadoForm.password} onChange={e => setEmpleadoForm({...empleadoForm, password: e.target.value})} />
                  </div>
                </div>
                <button type="submit" className="btn-smart btn-full" style={{ marginTop: '10px' }}>Contratar Staff</button>
              </form>
            </div>

            {/* INTEGRACIÓN DE HERRAMIENTAS ADICIONALES */}
            <div className="utilities-box">
              <h3 style={{ margin: '0 0 10px 0', fontSize: '15px' }}>⚡ Utilidades de Infraestructura</h3>
              <div className="utility-item-row">
                <span>Generador automático de contraseñas:</span>
                <button type="button" className="btn-utility-action" onClick={() => setEmpleadoForm({...empleadoForm, password: Math.random().toString(36).slice(-8)})}>Generar Clave</button>
              </div>
            </div>
          </div>

        </div>

        {/* VISUALIZACIÓN DE TABLAS DE LA BASE DE DATOS */}
        <div className="smart-card components-tables-wrapper">
          <h2>Visualización en Tiempo Real de la Nube</h2>
          
          <h3 style={{ color: 'var(--brand-green)', marginTop: '20px' }}>Plan de Rutinas Disponibles</h3>
          <div style={{ overflowX: 'auto' }}>
            <table className="admin-data-table">
              <thead>
                <tr><th>ID</th><th>Nivel</th><th>Duración</th><th>Ejercicios</th></tr>
              </thead>
              <tbody>
                {rutinas.map((r, i) => <tr key={i}><td><strong>{r.id_rutina}</strong></td><td>{r.nivel}</td><td>{r.duracion}</td><td>{r.ejercicios}</td></tr>)}
              </tbody>
            </table>
          </div>

          <h3 style={{ color: '#008CBA', marginTop: '30px' }}>Personal del Staff Activo</h3>
          <div style={{ overflowX: 'auto' }}>
            <table className="admin-data-table">
              <thead>
                <tr><th>ID Emp</th><th>Nombre</th><th>Especialidad</th><th>Usuario Web</th></tr>
              </thead>
              <tbody>
                {empleados.map((e, i) => <tr key={i}><td><strong>{e.id_empleado}</strong></td><td>{e.nombre}</td><td>{e.especialidad}</td><td><code>{e.username}</code></td></tr>)}
              </tbody>
            </table>
          </div>
        </div>

        {/* BAJAS MODULAR */}
        <div className="smart-card modification-panel">
          <h2>Modificación Rápida y Auditoría de Bajas</h2>
          <form onSubmit={e => e.preventDefault()}>
            <div className="fila-campos" style={{ marginBottom: '15px' }}>
              <div className="grupo-campo">
                <label>Tipo de Registro:</label>
                <select value={modPersonaForm.type} onChange={e => setModPersonaForm({...modPersonaForm, tipo: e.target.value})}>
                  <option value="empleado">Empleado (Staff)</option>
                  <option value="cliente">Cliente (Alumno)</option>
                </select>
              </div>
              <div className="grupo-campo">
                <label>ID Destino:</label>
                <input type="number" placeholder="Ej. 1" value={modPersonaForm.id} onChange={e => setModPersonaForm({...modPersonaForm, id: e.target.value})} />
              </div>
            </div>
            <button type="button" onClick={handleEliminarPersona} className="btn-smart btn-full" style={{ background: 'var(--brand-red)', color: '#fff' }}>Dar de Baja del Sistema</button>
          </form>
        </div>

      </main>
    </div>
  );
};