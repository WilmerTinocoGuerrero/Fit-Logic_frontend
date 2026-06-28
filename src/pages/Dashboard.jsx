import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [rol, setRol] = useState('');

  // Este bloque se ejecuta apenas el usuario intenta entrar a la página
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      // Si no tiene token, es un intruso. Lo mandamos al login.
      navigate('/login');
    } else {
      // Si tiene token, leemos sus datos para mostrarlos en pantalla
      setNombre(localStorage.getItem('usuario_nombre'));
      setRol(localStorage.getItem('usuario_rol'));
    }
  }, [navigate]);

  return (
    <Container fluid style={{ minHeight: "100vh", backgroundColor: "#0a0a0a", paddingTop: "100px" }}>
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          
          {/* Tarjeta de Bienvenida */}
          <Card className="shadow-lg border-0 text-white mb-4" style={{ borderRadius: "15px", backgroundColor: "#1a1a1a" }}>
            <Card.Body className="p-5">
              <h1 className="fw-bold mb-3">
                BIENVENIDO, <span style={{ color: "#c6ff00" }}>{nombre.toUpperCase()}</span>
              </h1>
              
              {/* Dependiendo del ROL, mostramos un subtítulo distinto */}
              {rol === '1' && <h5 className="text-muted">Panel de Administrador Supremo</h5>}
              {rol === '2' && <h5 className="text-muted">Panel de Instructor / Empleado</h5>}
              {rol === '3' && <h5 className="text-muted">Panel de Cliente</h5>}
              
              <hr style={{ borderColor: "#444" }} />
              
              {/* Aquí es donde resolveremos lo de los datos en NULL */}
              {rol === '3' && (
                <div className="mt-4 p-4 rounded" style={{ backgroundColor: "#222", borderLeft: "5px solid #c6ff00" }}>
                  <h4>¡Completa tu Perfil Físico!</h4>
                  <p className="text-light">
                    Para poder asignarte tu primera rutina y evaluar si tu plan es Premium o Básico, necesitamos conocer tu peso y altura actual.
                  </p>
                  <Button variant="dark" style={{ backgroundColor: "#c6ff00", color: "#000", fontWeight: "bold" }}>
                    Actualizar mis datos
                  </Button>
                </div>
              )}

            </Card.Body>
          </Card>

        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;