import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { loginUsuario } from '../services/api'; // <--- importamos a nuestro mensajero

const Login = () => {
  // Estados para atrapar lo que el usuario escribe
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  // Estados para manejar mensajes de error o éxito en pantalla
  const [errorMensaje, setErrorMensaje] = useState('');
  const navigate = useNavigate(); // herramienta para cambiar de página

  
  // esta pequeña parte es el bloque de seguridad (al momento de que el "Usuario" le de a "Retroceder pagina" )
useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);
  // ========================================================

  // función que se ejecuta cuando damos click en "Ingresar"
  const manejarSubmit = async (e) => {
    e.preventDefault();  // evita que la página se recargue
    setErrorMensaje(''); // limpiamos errores anteriores


    try{
      // 1. enviamos los datos al backend
      const data = await loginUsuario(correo, password);

      // 2. Si todo va bien... guardamos el TOKEN vip en el navegador
      localStorage.setItem('token', data.token);
      localStorage.setItem('usuario_nombre', data.usuario.nombre);
      localStorage.setItem('usuario_rol', data.usuario.id_rol);

      // 3. AGREGAMOS ESTE COMANDO PARA GUARDAR EL ID:  (guardamos en la memoria del navegador)
      localStorage.setItem('usuario_id', data.usuario.id_usuario);
      
      //  Guardamos si el perfil está completo
      localStorage.setItem('perfil_completo', data.usuario.perfil_completo);

      console.log("¡Bienvenido!", data.usuario.nombre);


      // 3. redirigimos a la página de inicio o dashboard
      // por el momento lo mandaremos el HOME , luego lo mandaremos al dashboard
      navigate('/dashboard');
    } catch (error) {
      // si el backend rechaza la petición, mostramos alerta
      setErrorMensaje(error.message);
    }
  };


return (
    <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", backgroundColor: "#0a0a0a" }}>
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 4 }}>
          
          <Card className="shadow-lg p-4 border-0 text-white" style={{ borderRadius: "15px", backgroundColor: "#1a1a1a" }}>
            <Card.Body>
              <h2 className="text-center mb-4 fw-bold">FIT<span style={{color: "#c6ff00"}}>LOGIC</span></h2>
              <p className="text-center text-light mb-4">Ingresa a tu cuenta para continuar</p>
              
              {/* Si hay error, mostramos una alerta roja de Bootstrap */}
              {errorMensaje && <Alert variant="danger">{errorMensaje}</Alert>}

              {/* Conectamos el formulario con manejarSubmit */}
              <Form onSubmit={manejarSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
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

                <Form.Group className="mb-4" controlId="formBasicPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="********" 
                    className="bg-dark text-white border-secondary"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                </Form.Group>

                <Button type="submit" className="w-100 fw-bold fs-5 mb-3 text-dark border-0" style={{ backgroundColor: "#c6ff00" }}>
                  Ingresar
                </Button>

                <div className="text-center mt-3">
                  <span className="text-light">¿No tienes cuenta? </span>
                  <Link to="/registro" className="fw-bold text-decoration-none" style={{ color: "#c6ff00" }}>
                    Regístrate aquí
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

export default Login;