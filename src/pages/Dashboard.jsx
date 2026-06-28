import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { actualizarPerfil } from '../services/api';  
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [rol, setRol] = useState('');
  const [idUsuario, setIdUsuario] = useState('');

// Leemos si el perfil está completo (convertimos el texto a booleano "true/false")
  const [perfilCompleto, setPerfilCompleto] = useState(false);

// Estado para el formulario físico
  const [edad, setEdad] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
// Estados para alertas
  const [alerta, setAlerta] = useState({ tipo: '', mensaje: ''});


  // Este bloque se ejecuta apenas el usuario intenta entrar a la página
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { replace: true });
    } else {
      setNombre(localStorage.getItem('usuario_nombre'));
      setRol(localStorage.getItem('usuario_rol'));
      setIdUsuario(localStorage.getItem('usuario_id'));
      
      // Verificamos el chisme que nos dejó el Login
      setPerfilCompleto(localStorage.getItem('perfil_completo') === 'true');
    }
  }, [navigate]);


// Función que se dispara al enviar el formulario---------------------------
  const manejarActualizacion = async (e) => {
    e.preventDefault();
    setAlerta({ tipo: '', mensaje: '' });
    try {
  const data = await actualizarPerfil(idUsuario, peso, altura, edad);
      setAlerta({ tipo: 'success', mensaje: data.mensaje });
      
      // Si tuvo éxito, actualizamos la memoria para que no le vuelva a salir
      localStorage.setItem('perfil_completo', 'true');
      
      // Esperamos 1.5 segundos y quitamos el formulario oscuro para mostrar el panel blanco
      setTimeout(() => {
        setPerfilCompleto(true);
      }, 1500);

    } catch (error) {
      setAlerta({ tipo: 'danger', mensaje: error.message });
    }
  };
  // ----------------------------------------

   return (
    <div style={{ display: 'flex', backgroundColor: '#f4f7fa', minHeight: '100vh' }}>
      
      {/* Nuestro nuevo Menú Lateral Fijo */}
      <Sidebar />

      {/* Contenedor Principal (lo empujamos 260px a la derecha para no tapar el menú) */}
      <div style={{ marginLeft: '260px', width: '100%', padding: '40px' }}>
        
        {/* LÓGICA INTELIGENTE: */}
        {rol === '3' && !perfilCompleto ? (
          
          /* SI ES CLIENTE Y LE FALTAN DATOS: Mostramos el formulario oscuro */
          <Container>
            <Row className="justify-content-center mt-5">
              <Col md={10} lg={8}>
                <Card className="shadow-lg border-0 text-white" style={{ borderRadius: "15px", backgroundColor: "#1a1a1a" }}>
                  <Card.Body className="p-5">
                    <h2 className="fw-bold text-center mb-4">¡Casi listos, <span style={{color: "#c6ff00"}}>{nombre.split(' ')[0]}</span>!</h2>
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
          
          /* si ya tenemos los datos(o es admin/empleado): Mostramos el diseño blanco profesional */
          <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h3 style={{ fontWeight: 'bold', color: '#333' }}>
                  Fit-Logic / <span style={{ color: '#00c853' }}>Dashboard</span>
                </h3>
                <p className="text-muted" style={{ fontWeight: '600' }}>mi control fitness</p>
              </div>
              <div style={{ backgroundColor: '#c6ff00', padding: '10px 20px', borderRadius: '5px', fontWeight: 'bold' }}>
                {rol === '1' ? 'ADMINISTRADOR' : rol === '2' ? 'EMPLEADO' : 'CLIENTE'}
              </div>
            </div>
            
            <hr style={{ borderColor: '#ddd', marginBottom: '40px' }} />
            
            {/* Aquí empezaremos a poner las tarjetas blancas cuadraditas de tu diseño */}
            <p className="text-muted text-center mt-5">¡El cascarón está listo! Las tarjetas se cargarán aquí.</p>
          </div>
          
        )}

      </div>
    </div>
  );
};

export default Dashboard;