import React, { useState, useEffect } from "react";
import { Card, Button, Table, Modal, Form, Alert, Row, Col } from "react-bootstrap";
import { obtenerProgresoAdmin, registrarProgresoAdmin, editarProgresoAdmin } from "../../services/adminProgresoApi";
import { obtenerClientesAdmin } from "../../services/adminClientesApi";

const ProgresoAdmin = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [listaProgresos, setListaProgresos] = useState([]);
  const [listaClientes, setListaClientes] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  const [formData, setFormData] = useState({
    id_cliente: "",
    peso_actual: "",
    observaciones: "",
  });

  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });

  const cargarProgresos = async () => {
    try {
      const data = await obtenerProgresoAdmin();
      setListaProgresos(data);
    } catch (error) {
      console.error("No se pudo cargar el historial de progresos:", error);
    }
  };

  const cargarClientes = async () => {
    try {
      const data = await obtenerClientesAdmin();
      setListaClientes(data);
    } catch (error) {
      console.error("No se pudo cargar el selector de clientes:", error);
    }
  };

  useEffect(() => {
    cargarProgresos();
    cargarClientes();
  }, []);

  const handleClose = () => {
    setMostrarModal(false);
    setMensaje({ tipo: "", texto: "" });
  };

  const abrirModalCrear = () => {
    setModoEdicion(false);
    setIdEditando(null);
    setFormData({
      id_cliente: listaClientes.length > 0 ? listaClientes[0].id_cliente : "",
      peso_actual: "",
      observaciones: "",
    });
    setMostrarModal(true);
  };

  const abrirModalEditar = (progreso) => {
    setModoEdicion(true);
    setIdEditando(progreso.id_progreso); 
    setFormData({
      id_cliente: progreso.id_cliente || "",
      peso_actual: progreso.peso_actual || "",
      observaciones: progreso.observaciones || "",
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
        id_cliente: parseInt(formData.id_cliente),
        peso_actual: parseFloat(formData.peso_actual),
        observaciones: formData.observaciones,
      };

      let respuesta;
      if (modoEdicion) {
        const datosEdicion = {
          peso_actual: datosAEnviar.peso_actual,
          observaciones: datosAEnviar.observaciones,
        };
        respuesta = await editarProgresoAdmin(idEditando, datosEdicion);
      } else {
        respuesta = await registrarProgresoAdmin(datosAEnviar);
      }

      setMensaje({
        tipo: "success",
        texto: respuesta.mensaje || "Progreso guardado correctamente.",
      });

      cargarProgresos();

      setTimeout(() => {
        handleClose();
      }, 1500);

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
          <h4>Control de Evolución Física (Clientes)</h4>
          <Card className="text-center mt-2" style={{ width: "130px", borderRadius: "10px" }}>
            <Card.Body className="p-2">
              <small className="text-muted fw-bold">REGISTROS</small>
              <h4 className="mb-0 fw-bold">{listaProgresos.length}</h4>
            </Card.Body>
          </Card>
        </div>

        <Button
          style={{
            backgroundColor: "#00c853",
            border: "none",
            borderRadius: "20px",
            padding: "10px 20px",
            fontWeight: "bold",
          }}
          onClick={abrirModalCrear}
        >
          🏋️‍♂️ Registrar Avance Físico
        </Button>
      </div>

      <Card className="shadow-sm border-0" style={{ borderRadius: "15px" }}>
        <Card.Body>
          <Table hover responsive className="align-middle">
            <thead className="text-muted">
              <tr>
                <th>ID REGISTRO</th>
                <th>CLIENTE</th>
                <th>PESO REGISTRADO</th>
                <th>OBSERVACIONES</th>
                <th>FECHA EVALUACIÓN</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {listaProgresos.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center text-muted py-4">
                    No hay registros de progreso antropométrico disponibles.
                  </td>
                </tr>
              ) : (
                listaProgresos.map((prog) => (
                  <tr key={prog.id_progreso}>
                    <td className="text-muted">#{prog.id_progreso}</td>
                    <td className="fw-bold">{prog.cliente_nombre || `Cliente #${prog.id_cliente}`}</td>
                    <td className="fw-bold" style={{ color: "#00c853" }}>{prog.peso_actual} Kg</td>
                    <td style={{ maxWidth: "250px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {prog.observaciones || "Sin observaciones."}
                    </td>
                    <td>{prog.fecha || "Reciente"}</td>
                    <td>
                      <Button variant="outline-success" size="sm" className="fw-bold" onClick={() => abrirModalEditar(prog)}>
                        📝 Corregir
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* MODAL REGISTRAR / EDITAR PROGRESO */}
      <Modal show={mostrarModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">{modoEdicion ? "Actualizar Evaluación" : "Registrar Nueva Evaluación"}</Modal.Title>
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
                disabled={modoEdicion}
                required
              >
                {listaClientes.map((c) => (
                  <option key={c.id_cliente} value={c.id_cliente}>
                    {c.nombre} (DNI: {c.dni})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Peso Actual (Kg):</Form.Label>
              <Form.Control
                type="number"
                step="0.1"
                name="peso_actual"
                value={formData.peso_actual}
                onChange={handleChange}
                placeholder="Ej: 74.4"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Observaciones del Avance:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="observaciones"
                value={formData.observaciones}
                onChange={handleChange}
                placeholder="Describe el rendimiento, progreso muscular o dieta del cliente..."
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-between mt-4">
              <Button variant="danger" onClick={handleClose}>
                Cancelar
              </Button>
              <Button
                type="submit"
                style={{
                  backgroundColor: "#00c853",
                  border: "none",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                Guardar Evaluación
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProgresoAdmin;