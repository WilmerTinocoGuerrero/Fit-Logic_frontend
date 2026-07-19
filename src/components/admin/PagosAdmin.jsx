import React, { useState, useEffect } from "react";
import { Card, Button, Table, Modal, Form, Alert, Row, Col } from "react-bootstrap";
import { obtenerPagosAdmin, registrarPagoAdmin, editarPagoAdmin } from "../../services/adminPagosApi";
import { obtenerClientesAdmin } from "../../services/adminClientesApi";

const PagosAdmin = ({ rol }) => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [listaPagos, setListaPagos] = useState([]);
  const [listaClientes, setListaClientes] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  const esEmpleado = rol === "2";

  const [formData, setFormData] = useState({
    id_cliente: "",
    monto: "",
    metodo_pago: "YAPE",
    tipo: "PREMIUM",
  });

  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });

  const cargarPagos = async () => {
    try {
      const data = await obtenerPagosAdmin();
      setListaPagos(data);
    } catch (error) {
      console.error("No se pudo cargar el historial de pagos:", error);
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
    cargarPagos();
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
      monto: "",
      metodo_pago: "YAPE",
      tipo: "PREMIUM",
    });
    setMostrarModal(true);
  };

  const abrirModalEditar = (pago) => {
    setModoEdicion(true);
    setIdEditando(pago.id_pago || pago.id_cliente); 
    setFormData({
      id_cliente: pago.id_cliente || "",
      monto: pago.monto || "",
      metodo_pago: pago.metodo_pago || "YAPE",
      tipo: pago.tipo || "PREMIUM",
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
        monto: parseFloat(formData.monto),
        metodo_pago: formData.metodo_pago,
        tipo: formData.tipo,
      };

      let respuesta;
      if (modoEdicion) {
        const datosEdicion = {
          monto: datosAEnviar.monto,
          metodo_pago: datosAEnviar.metodo_pago,
          tipo: datosAEnviar.tipo,
        };
        respuesta = await editarPagoAdmin(idEditando, datosEdicion);
      } else {
        respuesta = await registrarPagoAdmin(datosAEnviar);
      }

      setMensaje({
        tipo: "success",
        texto: respuesta.mensaje || "Operación realizada con éxito.",
      });

      cargarPagos();

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
          <h4>Historial de Caja y Pagos</h4>
          <Card className="text-center mt-2" style={{ width: "120px", borderRadius: "10px" }}>
            <Card.Body className="p-2">
              <small className="text-muted fw-bold">TOTAL PAGOS</small>
              <h4 className="mb-0 fw-bold">{listaPagos.length}</h4>
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
          onClick={abrirModalCrear}
        >
          ➕ Registrar Pago
        </Button>
      </div>

      <Card className="shadow-sm border-0" style={{ borderRadius: "15px" }}>
        <Card.Body>
          <Table hover responsive className="align-middle">
            <thead className="text-muted">
              <tr>
                <th>ID PAGO</th>
                <th>CLIENTE</th>
                <th>MONTO</th>
                <th>MÉTODO</th>
                <th>PLAN</th>
                <th>FECHA</th>
                {!esEmpleado && (
                <th>ACCIONES</th>
                )}
              </tr>
            </thead>
            <tbody>
              {listaPagos.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center text-muted py-4">
                    No se han registrado transacciones de pago.
                  </td>
                </tr>
              ) : (
                listaPagos.map((pago, index) => (
                  <tr key={pago.id_pago || index}>
                    <td className="text-muted">#{pago.id_pago || index + 1}</td>
                    <td className="fw-bold">{pago.cliente_nombre || `Cliente #${pago.id_cliente}`}</td>
                    <td className="fw-bold text-success">S/. {parseFloat(pago.monto).toFixed(2)}</td>
                    <td>
                      <span className="badge bg-light text-dark border">{pago.metodo_pago}</span>
                    </td>
                    <td>
                      <span
                        style={{
                          backgroundColor: pago.tipo?.toUpperCase() === "PREMIUM" ? "#c6ff00" : "#eaeaea",
                          color: "#000",
                          padding: "4px 10px",
                          borderRadius: "10px",
                          fontSize: "11px",
                          fontWeight: "bold",
                        }}
                      >
                        {pago.tipo?.toUpperCase()}
                      </span>
                    </td>
                    <td>{pago.fecha || "-"}</td>
                    {!esEmpleado && (
                      <td>
                        <Button variant="outline-success" size="sm" className="fw-bold" onClick={() => abrirModalEditar(pago)}>
                          ⚙️ Editar
                        </Button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* MODAL REGISTRAR / EDITAR */}
      <Modal show={mostrarModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">{modoEdicion ? "Actualizar Pago" : "Registrar Nuevo Pago"}</Modal.Title>
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

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Monto (S/.):</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    name="monto"
                    value={formData.monto}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Método de Pago:</Form.Label>
                  <Form.Select
                    name="metodo_pago"
                    value={formData.metodo_pago}
                    onChange={handleChange}
                  >
                    <option value="YAPE">YAPE</option>
                    <option value="PLIN">PLIN</option>
                    <option value="EFECTIVO">EFECTIVO</option>
                    <option value="TRANSFERENCIA">TRANSFERENCIA</option>
                    <option value="TARJETA">TARJETA</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Tipo de Membresía:</Form.Label>
              <Form.Select
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
              >
                <option value="BÁSICO">BÁSICO</option>
                <option value="ESTÁNDAR">ESTÁNDAR</option>
                <option value="PREMIUM">PREMIUM</option>
                <option value="VIP">VIP</option>
              </Form.Select>
            </Form.Group>

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
                Guardar Pago
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PagosAdmin;