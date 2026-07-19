import React, { useState, useEffect } from "react";
import { Card, Button, Table, Modal, Form, Alert, Row, Col } from "react-bootstrap";
import { obtenerAsistenciasAdmin, registrarAsistenciaAdmin } from "../../services/adminAsistenciasApi";
import { obtenerClientesAdmin } from "../../services/adminClientesApi";

const AsistenciasAdmin = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [listaAsistencias, setListaAsistencias] = useState([]);
  const [listaClientes, setListaClientes] = useState([]); // Cargados para el selector dinámico
  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });

  const [formData, setFormData] = useState({
    id_cliente: "",
    fecha: "",
    hora_ingreso: "",
  });

  // Cargar el historial de ingresos
  const cargarHistorialAsistencias = async () => {
    try {
      const data = await obtenerAsistenciasAdmin();
      setListaAsistencias(data);
    } catch (error) {
      console.error("No se pudo cargar el historial de asistencias:", error);
    }
  };

  // Cargar clientes para el dropdown
  const cargarClientesSelector = async () => {
    try {
      const data = await obtenerClientesAdmin();
      setListaClientes(data);
    } catch (error) {
      console.error("No se pudo cargar el selector de clientes:", error);
    }
  };

  useEffect(() => {
    cargarHistorialAsistencias();
    cargarClientesSelector();
  }, []);

  const handleClose = () => {
    setMostrarModal(false);
    setMensaje({ tipo: "", texto: "" });
  };

  const abrirModalRegistrar = () => {
    // Obtener la fecha y hora actual local de tu PC de forma automática para ahorrar tiempo
    const hoy = new Date();
    const fechaActual = hoy.toISOString().split("T")[0];
    const horaActual = hoy.toTimeString().split(" ")[0]; // ej: "18:30:15"

    setFormData({
      id_cliente: listaClientes.length > 0 ? listaClientes[0].id_cliente : "",
      fecha: fechaActual,
      hora_ingreso: horaActual,
    });
    setMostrarModal(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje({ tipo: "", texto: "" });

    try {
      const datosAEnviar = {
        ...formData,
        id_cliente: parseInt(formData.id_cliente),
      };

      const respuesta = await registrarAsistenciaAdmin(datosAEnviar);
      setMensaje({
        tipo: "success",
        texto: respuesta.mensaje || "Asistencia registrada correctamente.",
      });

      cargarHistorialAsistencias();

      setTimeout(() => {
        handleClose();
      }, 2000);

    } catch (error) {
      setMensaje({
        tipo: "danger",
        texto: error.message,
      });
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4>Registro General de Entradas y Asistencias</h4>
          <Card className="text-center mt-2" style={{ width: "120px", borderRadius: "10px" }}>
            <Card.Body className="p-2">
              <small className="text-muted fw-bold">TOTAL HOY</small>
              <h4 className="mb-0 fw-bold">{listaAsistencias.length}</h4>
            </Card.Body>
          </Card>
        </div>

        <Button
          style={{
            backgroundColor: "#28A745",
            border: "none",
            borderRadius: "20px",
            padding: "10px 20px",
          }}
          onClick={abrirModalRegistrar}
        >
          <i className="bi bi-clock"></i> Registrar Entrada Manual
        </Button>
      </div>

      <Card className="shadow-sm border-0" style={{ borderRadius: "15px" }}>
        <Card.Body>
          <Table hover responsive className="align-middle">
            <thead className="text-muted">
              <tr>
                <th>ID ASISTENCIA</th>
                <th>ID CLIENTE</th>
                <th>CLIENTE</th>
                <th>FECHA DE INGRESO</th>
                <th>HORA DE ENTRADA</th>
              </tr>
            </thead>
            <tbody>
              {listaAsistencias.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-4">
                    No hay registros de asistencia para el día de hoy.
                  </td>
                </tr>
              ) : (
                listaAsistencias.map((asist) => (
                  <tr key={asist.id_asistencia || asist.id_cliente + asist.fecha}>
                    <td className="text-muted">#{asist.id_asistencia || "-"}</td>
                    <td className="text-muted">#{asist.id_cliente}</td>
                    <td className="fw-bold">{asist.cliente_nombre || "Cliente Fit Logic"}</td>
                    <td>{asist.fecha}</td>
                    <td>
                      <span
                        className="fw-bold"
                        style={{
                          backgroundColor: "#eaeaea",
                          color: "#333",
                          padding: "3px 8px",
                          borderRadius: "10px",
                          fontSize: "12px",
                        }}
                      >
                        {asist.hora_ingreso || asist.hora}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* MODAL PARA REGISTRO MANUAL */}
      <Modal show={mostrarModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Registrar Entrada</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {mensaje.texto && (
            <Alert variant={mensaje.tipo}>{mensaje.texto}</Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Seleccionar Cliente:</Form.Label>
              <Form.Select
                name="id_cliente"
                value={formData.id_cliente}
                onChange={handleChange}
                required
              >
                {listaClientes.length === 0 && (
                  <option value="">Cargando clientes de Fit Logic...</option>
                )}
                {listaClientes.map((c) => (
                  <option key={c.id_cliente} value={c.id_cliente}>
                    {c.nombre} (DNI: {c.dni})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Fecha:</Form.Label>
                  <Form.Control
                    type="date"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Hora de Ingreso:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="HH:MM:SS"
                    name="hora_ingreso"
                    value={formData.hora_ingreso}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-between mt-4">
              <Button variant="danger" onClick={handleClose}>
                Cancelar
              </Button>
              <Button
                type="submit"
                style={{
                  backgroundColor: "#28A745",
                  border: "none",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                Registrar Ingreso
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AsistenciasAdmin;