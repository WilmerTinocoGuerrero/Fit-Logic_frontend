import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

const ResumenCliente = ({ resumen }) => {
  return (
    <Row>
      <Col md={6} className="mb-4">
        <Card className="text-center shadow-sm border-0 h-100" style={{ borderRadius: '15px' }}>
          <Card.Body className="d-flex flex-column justify-content-center p-5">
            <h5 className="text-muted fw-bold mb-4">Mi Membresía :</h5>
            <h1 style={{ color: '#555', fontWeight: '400', fontSize: '2.5rem' }}>{resumen.membresia_estado.toUpperCase()}</h1>
            <span className="text-muted mt-2">({resumen.membresia_tipo})</span>
          </Card.Body>
        </Card>
      </Col>
      <Col md={6} className="mb-4">
        <Card className="text-center shadow-sm border-0 h-100" style={{ borderRadius: '15px' }}>
          <Card.Body className="d-flex flex-column justify-content-center p-5">
            <h5 className="text-muted fw-bold mb-4">Mi Rutina :</h5>
            <h1 style={{ color: '#555', fontWeight: '400', fontSize: '2.5rem' }}>{resumen.nivel_rutina}</h1>
          </Card.Body>
        </Card>
      </Col>
      <Col md={6} className="mb-4">
        <Card className="text-center shadow-sm border-0 h-100" style={{ borderRadius: '15px' }}>
          <Card.Body className="d-flex flex-column justify-content-center p-5">
            <h5 className="text-muted fw-bold mb-4">Último Peso :</h5>
            <h1 style={{ color: '#555', fontWeight: '400', fontSize: '2.5rem' }}>{resumen.peso_actual} Kg</h1>
          </Card.Body>
        </Card>
      </Col>
      <Col md={6} className="mb-4">
        <Card className="text-center shadow-sm border-0 h-100" style={{ borderRadius: '15px' }}>
          <Card.Body className="d-flex flex-column justify-content-center p-5">
            <h5 className="text-muted fw-bold mb-4">Asistencias :</h5>
            <h1 style={{ color: '#555', fontWeight: '400', fontSize: '2.5rem' }}>{resumen.asistencias_mes}</h1>
            <span className="text-muted mt-2">este mes</span>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
export default ResumenCliente;