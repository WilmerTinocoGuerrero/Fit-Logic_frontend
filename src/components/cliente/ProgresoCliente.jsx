import React from "react";
import { Card, Table, Alert } from "react-bootstrap";

const ProgresoCliente = ({ miProgreso }) => {
  return (
    <Card className="shadow-sm border-0" style={{ borderRadius: "15px" }}>
      <Card.Body className="p-5">
        <h4 className="fw-bold mb-4" style={{ color: "#333" }}>
          📈 Historial de Peso
        </h4>
        {miProgreso.length === 0 ? (
          <Alert variant="info" className="text-center">
            Aún no tienes registros de progreso. ¡Sigue entrenando duro!
          </Alert>
        ) : (
          <Table responsive hover className="align-middle text-center">
            <thead style={{ backgroundColor: "#f8f9fa" }}>
              <tr>
                <th>Fecha de Registro</th>
                <th>Peso Actual</th>
                <th>Observaciones del Instructor</th>
              </tr>
            </thead>
            <tbody>
              {miProgreso.map((registro, index) => (
                <tr key={index}>
                  <td className="text-muted fw-bold">{registro.fecha}</td>
                  <td
                    className="fw-bold"
                    style={{ color: "#00c853", fontSize: "1.2rem" }}
                  >
                    {registro.peso} Kg
                  </td>
                  <td className="text-muted">{registro.observaciones}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
};
export default ProgresoCliente;
