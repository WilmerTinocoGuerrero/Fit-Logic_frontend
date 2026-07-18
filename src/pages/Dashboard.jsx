import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {
  actualizarPerfil, obtenerResumenCliente, obtenerRutinaCliente,
  obtenerProgresoCliente, obtenerAsistenciaCliente, obtenerMembresiaCliente, obtenerPerfilCliente
} from '../services/clienteApi';

// IMPORTAMOS LOS COMPONENTES DE ARQUITECTURA LIMPIA
import Sidebar from '../components/Sidebar';
import ResumenCliente from '../components/cliente/ResumenCliente';
import RutinasCliente from '../components/cliente/RutinasCliente';
import ProgresoCliente from '../components/cliente/ProgresoCliente';
import AsistenciaCliente from '../components/cliente/AsistenciaCliente';
import MembresiaCliente from '../components/cliente/MembresiaCliente';
import PerfilCliente from '../components/cliente/PerfilCliente';
import EmpleadosAdmin from '../components/admin/EmpleadosAdmin';
import ClientesAdmin from '../components/admin/ClientesAdmin';
import MembresiasAdmin from '../components/admin/MembresiasAdmin'; 
import RutinasAdmin from '../components/admin/RutinasAdmin'; 
import AsistenciasAdmin from '../components/admin/AsistenciasAdmin'; 
import PagosAdmin from '../components/admin/PagosAdmin'; 
import ProgresoAdmin from '../components/admin/ProgresoAdmin'; 
import ResumenAdmin from '../components/admin/ResumenAdmin'; // <-- IMPORTAMOS EL NUEVO COMPONENTE ESTADÍSTICO

const Dashboard = () => {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [rol, setRol] = useState('');
  const [idUsuario, setIdUsuario] = useState('');
  const [perfilCompleto, setPerfilCompleto] = useState(false);
  const [vistaActual, setVistaActual] = useState('resumen');

  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [edad, setEdad] = useState('');
  const [alerta, setAlerta] = useState({ tipo: '', mensaje: '' });

  const [resumen, setResumen] = useState({ 
    peso_actual: '0', 
    membresia_tipo: 'Cargando...', 
    membresia_estado: 'Cargando...',
    asistencias_mes: 0, 
    nivel_rutina: 'Cargando...' 
  });

  const [misRutinas, setMisRutinas] = useState([]);
  const [miProgreso, setMiProgreso] = useState([]);
  const [miAsistencia, setMiAsistencia] = useState([]);
  const [miMembresia, setMiMembresia] = useState({});
  const [miPerfil, setMiPerfil] = useState(null); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }
    setNombre(localStorage.getItem('usuario_nombre'));
    const rolActual = localStorage.getItem('usuario_rol');
    const idActual = localStorage.getItem('usuario_id');
    const isCompleto = localStorage.getItem('perfil_completo') === 'true';

    setRol(rolActual);
    setIdUsuario(idActual);
    setPerfilCompleto(isCompleto);

    if (rolActual === '3' && isCompleto) {
      cargarDatosDashboard(idActual);
      cargarRutinas(idActual);
      cargarProgreso(idActual);
      cargarAsistencia(idActual);
      cargarMembresia(idActual);
      cargarPerfil(idActual);
    }
  }, [navigate]);

  const cargarDatosDashboard = async (id) => { try { const data = await obtenerResumenCliente(id); setResumen(data); } catch (error) { console.error(error); } };
  const cargarRutinas = async (id) => { try { const data = await obtenerRutinaCliente(id); setMisRutinas(data); } catch (error) { console.error(error); } };
  const cargarProgreso = async (id) => { try { const data = await obtenerProgresoCliente(id); setMiProgreso(data); } catch (error) { console.error(error); } };
  const cargarAsistencia = async (id) => { try { const data = await obtenerAsistenciaCliente(id); setMiAsistencia(data); } catch (error) { console.error(error); } };
  const cargarMembresia = async (id) => { try { const data = await obtenerMembresiaCliente(id); setMiMembresia(data); } catch (error) { console.error(error); } };
  const cargarPerfil = async (id) => { try { const data = await obtenerPerfilCliente(id); setMiPerfil(data); } catch (error) { console.error(error); } };

  const manejarActualizacion = async (e) => {
    e.preventDefault();
    setAlerta({ tipo: '', mensaje: '' });
    try {
      const data = await actualizarPerfil(idUsuario, peso, altura, edad);
      setAlerta({ tipo: 'success', mensaje: data.mensaje });
      localStorage.setItem('perfil_completo', 'true');
      setTimeout(() => { setPerfilCompleto(true); cargarDatosDashboard(idUsuario); }, 1500);
    } catch (error) {
      setAlerta({ tipo: 'danger', mensaje: error.message });
    }
  };

  return (
    <div style={{ display: 'flex', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Sidebar cambiarVista={setVistaActual} vistaActual={vistaActual} rol={rol} />

      <div style={{ marginLeft: '260px', width: '100%', padding: '40px' }}>
        {rol === '3' && !perfilCompleto ? (
          /* ========================================================= */
          /* FORMULARIO DE PRIMER INGRESO                              */
          /* ========================================================= */
          <Container>
            <Row className="justify-content-center mt-5">
              <Col md={10} lg={8}>
                <Card className="shadow-lg border-0 text-white" style={{ borderRadius: "15px", backgroundColor: "#1a1a1a" }}>
                  <Card.Body className="p-5">
                    <h2 className="fw-bold text-center mb-4">¡Casi listos, <span style={{ color: "#c6ff00" }}>{nombre.split(' ')[0]}</span>!</h2>
                    <div className="p-4 rounded" style={{ backgroundColor: "#222", borderLeft: "5px solid #c6ff00" }}>
                      <h5 className="mb-3">🏋️‍♂️ Completa tu Perfil Físico</h5>
                      <p className="text-light mb-4">Para asignarte tu primera rutina, necesitamos estos datos. Solo lo harás una vez.</p>
                      {alerta.mensaje && <Alert variant={alerta.tipo}>{alerta.mensaje}</Alert>}
                      <Form onSubmit={manejarActualizacion}>
                        <Row>
                          <Col md={4}>
                            <Form.Group className="mb-3">
                              <Form.Label>Edad</Form.Label>
                              <Form.Control type="number" className="bg-dark text-white border-secondary" value={edad} onChange={(e) => setEdad(e.target.value)} required />
                            </Form.Group>
                          </Col>
                          <Col md={4}>
                            <Form.Group className="mb-3">
                              <Form.Label>Peso (Kg)</Form.Label>
                              <Form.Control type="number" step="0.1" className="bg-dark text-white border-secondary" value={peso} onChange={(e) => setPeso(e.target.value)} required />
                            </Form.Group>
                          </Col>
                          <Col md={4}>
                            <Form.Group className="mb-3">
                              <Form.Label>Altura (cm)</Form.Label>
                              <Form.Control type="number" className="bg-dark text-white border-secondary" value={altura} onChange={(e) => setAltura(e.target.value)} required />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Button type="submit" variant="dark" className="mt-2 w-100" style={{ backgroundColor: "#c6ff00", color: "#000", fontWeight: "bold" }}>Guardar y continuar</Button>
                      </Form>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        ) : (
          /* ========================================================= */
          /* PANEL MODULAR DEL CLIENTE / PERSONAL                      */
          /* ========================================================= */
          <Container fluid>
            {/* CABECERA DINÁMICA */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h3 style={{ fontWeight: 'bold', color: '#333' }}>
                  Fit-Logic /{' '}
                  <span style={{ color: '#00c853' }}>
                    {vistaActual === 'resumen' && 'Dashboard'}
                    {vistaActual === 'clientes' && 'Gestión de Clientes'}
                    {vistaActual === 'empleados' && 'Mis Empleados'}
                    {vistaActual === 'rutinas' && 'Mis Rutinas'}
                    {vistaActual === 'progreso' && (rol === '3' ? 'Mi Progreso' : 'Evolución de Clientes')}
                    {vistaActual === 'asistencia' && (rol === '3' ? 'Mi Asistencia' : 'Gestión de Asistencias')}
                    {vistaActual === 'membresia' && (rol === '3' ? 'Mi Membresía' : 'Gestión de Membresías')}
                    {vistaActual === 'perfil' && 'Mi Perfil'}
                    {vistaActual === 'pagos' && 'Gestión de Pagos'}
                  </span>
                </h3>
                <p className="text-muted" style={{ fontWeight: '600' }}>
                  {vistaActual === 'resumen' && 'El éxito es la suma de pequeños esfuerzos diarios. ¡Bienvenido de vuelta!'}
                  {vistaActual === 'clientes' && 'Administra, registra y actualiza los expedientes antropométricos y credenciales de los clientes.'}
                  {vistaActual === 'empleados' && 'Gestiona los accesos, roles y el personal interno del gimnasio.'}
                  {vistaActual === 'rutinas' && 'Estos serán tus ejercicios que te acompañarán durante todo este recorrido de entrenamiento. ¡A darle con todo!'}
                  {vistaActual === 'progreso' && (rol === '3' 
                    ? 'Los números en la báscula solo cuentan una parte de la historia. ¡Mira lo fuerte que te has vuelto!' 
                    : 'Controla el historial de peso corporal, porcentaje graso y evolución antropométrica de cada cliente.')}
                  {vistaActual === 'asistencia' && (rol === '3' 
                    ? 'La disciplina vence al talento. ¡Sigue sumando esos días perfectos!' 
                    : 'Historial de ingresos y control de accesos manuales al establecimiento.')}
                  {vistaActual === 'membresia' && (rol === '3' 
                    ? 'Tu suscripción al éxito no expira mientras no te rindas. ¡Sigue construyendo tu legado!' 
                    : 'Modifica tipos de planes, actualiza estados de vigencia y extiende membresías de clientes.')}
                  {vistaActual === 'perfil' && 'Tu nombre, tus metas, tus rules. Nadie va a entrenar por ti.'}
                  {vistaActual === 'pagos' && 'Control de transacciones, cobros de planes de entrenamiento y arqueo de caja general.'}
                </p>
              </div>
              <div style={{ backgroundColor: '#c6ff00', padding: '10px 20px', borderRadius: '5px', fontWeight: 'bold', color: '#000' }}>
                {rol === '1' ? 'ADMINISTRADOR' : rol === '2' ? 'EMPLEADO' : 'CLIENTE'}
              </div>
            </div>

            <hr style={{ borderColor: '#ddd', marginBottom: '40px' }} />

            {/* RENDERIZADO DE COMPONENTES */}
            {/* Vistas específicas del Cliente */}
            {rol === '3' && vistaActual === 'resumen' && <ResumenCliente resumen={resumen} />}
            {rol === '3' && vistaActual === 'rutinas' && <RutinasCliente misRutinas={misRutinas} />}
            {rol === '3' && vistaActual === 'progreso' && <ProgresoCliente miProgreso={miProgreso} />}
            {rol === '3' && vistaActual === 'asistencia' && <AsistenciaCliente miAsistencia={miAsistencia} />}
            {rol === '3' && vistaActual === 'membresia' && <MembresiaCliente miMembresia={miMembresia} />}
            {rol === '3' && vistaActual === 'perfil' && miPerfil && <PerfilCliente miPerfil={miPerfil} />}

            {/* Vistas compartidas para Admin y Empleado */}
            {(rol === '1' || rol === '2') && vistaActual === 'resumen' && <ResumenAdmin rol={rol} />} {/* <-- COMPONENTE INTEGRADO */}
            {(rol === '1' || rol === '2') && vistaActual === 'clientes' && <ClientesAdmin />}
            {(rol === '1' || rol === '2') && vistaActual === 'membresia' && <MembresiasAdmin />}
            {(rol === '1' || rol === '2') && vistaActual === 'rutinas' && <RutinasAdmin />}
            {(rol === '1' || rol === '2') && vistaActual === 'asistencia' && <AsistenciasAdmin />}
            {(rol === '1' || rol === '2') && vistaActual === 'pagos' && <PagosAdmin />}
            {(rol === '1' || rol === '2') && vistaActual === 'progreso' && <ProgresoAdmin />}

            {/* Vista exclusiva para el Administrador */}
            {rol === '1' && vistaActual === 'empleados' && <EmpleadosAdmin />}
          </Container>
        )}
      </div>
    </div>
  );
};

export default Dashboard;