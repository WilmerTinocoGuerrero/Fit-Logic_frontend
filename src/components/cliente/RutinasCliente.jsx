import React from "react";
import { Row, Col, Card, Alert } from "react-bootstrap";

const RutinasCliente = ({ misRutinas }) => {
  if (misRutinas.length === 0) {
    return (
      <Alert variant="warning" className="text-center">
        Aún no tienes una rutina asignada. Pide a tu instructor que te asigne
        una.
      </Alert>
    );
  }

  return (
    <div>
      {misRutinas.map((rutina, index) => {
        const listaEjercicios = rutina.nombre_rutina.split("\n");

        return (
          <div key={index} className="mb-5">
            <h5 className="fw-bold mb-3" style={{ color: "#333" }}>
              Día asignado:{" "}
              <span style={{ color: "#00c853", textTransform: "capitalize" }}>
                {rutina.dia_semana}
              </span>
            </h5>
            <Row>
              <Col md={4}>
                <Card
                  className="mb-4 shadow-sm border-0"
                  style={{ borderRadius: "15px" }}
                >
                  <Card.Body className="py-4 px-4">
                    <h5 className="fw-bold text-muted mb-0">
                      Nivel : <span className="text-dark">{rutina.nivel}</span>
                    </h5>
                  </Card.Body>
                </Card>
                <Card
                  className="mb-4 shadow-sm border-0"
                  style={{ borderRadius: "15px" }}
                >
                  <Card.Body className="py-4 px-4">
                    <h5 className="fw-bold text-muted mb-0">
                      Objetivo :{" "}
                      <span className="text-dark">{rutina.objetivo}</span>
                    </h5>
                  </Card.Body>
                </Card>
                <Card
                  className="mb-4 shadow-sm border-0"
                  style={{ borderRadius: "15px" }}
                >
                  <Card.Body className="py-4 px-4">
                    <h5 className="fw-bold text-muted mb-0">
                      Duración :{" "}
                      <span className="text-dark">{rutina.descripcion}</span>
                    </h5>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={8}>
                <Card
                  className="shadow-sm border-0 h-100"
                  style={{ borderRadius: "15px" }}
                >
                  <Card.Body className="p-5">
                    <h4 className="fw-bold mb-4" style={{ color: "#6c757d" }}>
                      Ejercicios :
                    </h4>
                    <ul
                      style={{
                        fontSize: "1.2rem",
                        lineHeight: "2.5",
                        color: "#000",
                        fontWeight: "bold",
                        paddingLeft: "20px",
                      }}
                    >
                      {listaEjercicios.map((ejercicio, i) => (
                        ejercicio.trim() !== "" ? (
                        <li key={i}>{ejercicio.trim()}</li>
                        ) : null
                      ))}
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        );
      })}
    </div>
  );
};
export default RutinasCliente;
