import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", backgroundColor: "#0a0a0a" }}>
      {/* El comentario ahora está ADENTRO del contenedor principal */}
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 4 }}>
          
          <Card className="shadow-lg p-4 border-0 text-white" style={{ borderRadius: "15px", backgroundColor: "#1a1a1a" }}>
            <Card.Body>
              <h2 className="text-center mb-4 fw-bold">FIT<span style={{color: "#c6ff00"}}>LOGIC</span></h2>
              <p className="text-center text-light mb-4">Ingresa a tu cuenta para continuar</p>
              
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Correo Electrónico</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="ejemplo@fitlogic.com" 
                    className="bg-dark text-white border-secondary"
                    required 
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="********" 
                    className="bg-dark text-white border-secondary"
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