import React from "react";
import { Card, Table, Alert } from "react-bootstrap";

const AsistenciaCliente = ({ miAsistencia }) => {
  return (
    <Card className="shadow-sm border-0" style={{ borderRadius: "15px" }}>
      <Card.Body className="p-5">
        <h4 className="fw-bold mb-4" style={{ color: "#333" }}>
          🚚 Registro de Asistencias
        </h4>
        {miAsistencia.length === 0 ? (
          <Alert variant="info" className="text-center">
            Aún no tienes registros de ingreso al gimnasio.
          </Alert>
        ) : (
          <Table responsive hover className="align-middle text-center">
            <thead style={{ backgroundColor: "#f8f9fa" }}>
              <tr>
                <th>Fecha de Ingreso</th>
                <th>Hora de Ingreso</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {miAsistencia.map((registro, index) => (
                <tr key={index}>
                  <td className="fw-bold text-dark">{registro.fecha}</td>
                  <td className="text-muted">{registro.hora}</td>
                  <td>
                    <span className="badge bg-success">Presente</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
};
export default AsistenciaCliente;
