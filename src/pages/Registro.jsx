import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { registrarUsuario } from '../services/authApi'; // importamos el nuevo mensajero 


const Registro = () => {
// Estados para atrapar los datos del formulario
  const [nombre, setNombre] = useState('');
  const [dni, setDni] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  
  // Estados para mostrar alertas visuales
  const [errorMensaje, setErrorMensaje] = useState('');
  const [exitoMensaje, setExitoMensaje] = useState('');
  
  const navigate = useNavigate();

  const manejarSubmit = async (e) => {
    e.preventDefault();
    setErrorMensaje('');
    setExitoMensaje('');

    try {
      // Llamamos a flask usando nuestro mensajero
      const data = await registrarUsuario(nombre, dni, correo, password);
      
      // Si todo sale bien, mostramos mensaje verde
      setExitoMensaje(data.mensaje);
      
      // Esperamos 2 segundos y redirigimos automáticamente al Login
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      // Si Flask nos rechaza (correo duplicado), mostramos mensaje rojo
      setErrorMensaje(error.message);
    }
  };


return (
    <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", backgroundColor: "#0a0a0a", padding: "50px 0" }}>
      <Row className="w-100">
        <Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }} xl={{ span: 4, offset: 4 }}>
          
          <Card className="shadow-lg p-4 border-0 text-white" style={{ borderRadius: "15px", backgroundColor: "#1a1a1a" }}>
            <Card.Body>
              <h2 className="text-center mb-4 fw-bold">ÚNETE A FIT<span style={{color: "#c6ff00"}}>LOGIC</span></h2>
              <p className="text-center text-light mb-4">Completa tus datos para crear tu cuenta</p>
              
              {/* Alertas dinámicas */}
              {errorMensaje && <Alert variant="danger">{errorMensaje}</Alert>}
              {exitoMensaje && <Alert variant="success">{exitoMensaje}</Alert>}

              <Form onSubmit={manejarSubmit}>
                <Form.Group className="mb-3" controlId="formNombre">
                  <Form.Label>Nombre Completo</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Ej. Juan Pérez" 
                    className="bg-dark text-white border-secondary"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required 
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDni">
                  <Form.Label>DNI</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Tu número de documento" 
                    className="bg-dark text-white border-secondary"
                    maxLength="8"
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    required 
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Correo Electrónico</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="ejemplo@fitlogic.com" 
                    className="bg-dark text-white border-secondary"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required 
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Crea una contraseña segura" 
                    className="bg-dark text-white border-secondary"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                </Form.Group>

                <Button type="submit" className="w-100 fw-bold fs-5 mb-3 text-dark border-0" style={{ backgroundColor: "#c6ff00" }}>
                  Crear Cuenta
                </Button>

                <div className="text-center mt-3">
                  <span className="text-light">¿Ya tienes una cuenta? </span>
                  <Link to="/login" className="fw-bold text-decoration-none" style={{ color: "#c6ff00" }}>
                    Inicia sesión aquí
                  </Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
          
        </Col>
      </Row>
    </Container>
  );
};

export default Registro;