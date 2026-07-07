import React from "react";
import { Row, Col, Card, Table, Alert } from "react-bootstrap";

const MembresiaCliente = ({ miMembresia }) => {
  if (!miMembresia || !miMembresia.estado) {
    return (
      <Alert variant="warning" className="text-center">
        No tienes una membresía activa registrada en el sistema.
      </Alert>
    );
  }

  return (
    <>
      <Row className="mb-4">
        <Col md={4}>
          <Card
            className="text-center shadow-sm border-0 h-100"
            style={{ borderRadius: "15px" }}
          >
            <Card.Body className="p-4">
              <h6 className="text-muted fw-bold text-uppercase mb-3">
                Estado Actual
              </h6>
              <h2
                style={{
                  color:
                    miMembresia.estado === "Activa" ||
                    miMembresia.estado === "Activo"
                      ? "#00c853"
                      : "#ff4d4d",
                  fontWeight: "bold",
                }}
              >
                {miMembresia.estado.toUpperCase()}
              </h2>
              <p className="text-muted mb-0">
                Plan: <span className="fw-bold">{miMembresia.tipo}</span>
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card
            className="text-center shadow-sm border-0 h-100"
            style={{ borderRadius: "15px" }}
          >
            <Card.Body className="p-4">
              <h6 className="text-muted fw-bold text-uppercase mb-3">
                Fecha de Inicio
              </h6>
              <h3 className="fw-bold text-dark">{miMembresia.fecha_inicio}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card
            className="text-center shadow-sm border-0 h-100"
            style={{ borderRadius: "15px" }}
          >
            <Card.Body className="p-4">
              <h6 className="text-muted fw-bold text-uppercase mb-3">
                Vencimiento
              </h6>
              <h3 className="fw-bold text-dark">{miMembresia.fecha_fin}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="shadow-sm border-0" style={{ borderRadius: "15px" }}>
        <Card.Body className="p-5">
          <h4 className="fw-bold mb-4" style={{ color: "#333" }}>
            💳 Historial de Pagos
          </h4>
          {!miMembresia.pagos || miMembresia.pagos.length === 0 ? (
            <Alert variant="info" className="text-center">
              Aún no tienes pagos registrados en esta membresía.
            </Alert>
          ) : (
            <Table responsive hover className="align-middle text-center">
              <thead style={{ backgroundColor: "#f8f9fa" }}>
                <tr>
                  <th>Fecha de Pago</th>
                  <th>Método</th>
                  <th>Monto</th>
                </tr>
              </thead>
              <tbody>
                {miMembresia.pagos.map((pago, index) => (
                  <tr key={index}>
                    <td className="fw-bold text-dark">{pago.fecha}</td>
                    <td>
                      <span className="badge bg-secondary">{pago.metodo}</span>
                    </td>
                    <td className="fw-bold" style={{ color: "#00c853" }}>
                      S/ {pago.monto.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </>
  );
};
export default MembresiaCliente;
