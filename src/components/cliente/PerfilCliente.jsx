import React from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";

const PerfilCliente = ({ miPerfil }) => {
  return (
    <Card className="shadow-sm border-0" style={{ borderRadius: "15px" }}>
      <Card.Body className="p-5">
        <h4 className="fw-bold mb-4" style={{ color: "#333" }}>
          👤 Mis Datos Personales
        </h4>
        <div
          className="mb-5 p-4 rounded"
          style={{
            backgroundColor: "#f8f9fa",
            borderLeft: "5px solid #00c853",
          }}
        >
          <h6 className="fw-bold text-dark mb-3">Información de la Cuenta</h6>
          <Row>
            <Col md={8}>
              <Form.Group>
                <Form.Label className="text-muted fw-bold">
                  Correo Electrónico (Asociado al Login)
                </Form.Label>
                <div className="d-flex gap-2">
                  <Form.Control
                    type="email"
                    value={miPerfil.correo}
                    readOnly
                    className="bg-white"
                    disabled
                  />
                  <Button variant="outline-secondary" disabled>
                    Editar
                  </Button>
                </div>
                <Form.Text className="text-muted d-block mt-2">
                  <span style={{ color: "#d32f2f", fontWeight: "bold" }}>
                    🛡️ Regla de Seguridad:
                  </span>{" "}
                  Por protección de la cuenta, solo puedes actualizar tu correo
                  electrónico una vez cada 30 días. Próxima actualización
                  disponible en: <strong>15 días</strong>.
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>
        </div>
        <h6 className="fw-bold text-dark mb-3 mt-4">Medidas y Registro</h6>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-4">
              <Form.Label className="text-muted fw-bold">
                Nombre Completo
              </Form.Label>
              <Form.Control
                type="text"
                value={miPerfil.nombre}
                readOnly
                className="bg-light border-0 py-2"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-4">
              <Form.Label className="text-muted fw-bold">DNI</Form.Label>
              <Form.Control
                type="text"
                value={miPerfil.dni}
                readOnly
                className="bg-light border-0 py-2"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label className="text-muted fw-bold">Edad</Form.Label>
              <Form.Control
                type="text"
                value={`${miPerfil.edad} años`}
                readOnly
                className="bg-light border-0 py-2 text-center fw-bold"
                style={{ color: "#00c853" }}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label className="text-muted fw-bold">
                Peso Actual
              </Form.Label>
              <Form.Control
                type="text"
                value={`${miPerfil.peso} Kg`}
                readOnly
                className="bg-light border-0 py-2 text-center fw-bold"
                style={{ color: "#00c853" }}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label className="text-muted fw-bold">Altura</Form.Label>
              <Form.Control
                type="text"
                value={`${miPerfil.altura} cm`}
                readOnly
                className="bg-light border-0 py-2 text-center fw-bold"
                style={{ color: "#00c853" }}
              />
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
export default PerfilCliente;
